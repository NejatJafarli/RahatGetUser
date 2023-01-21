import { Injectable } from '@angular/core';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import {Storage} from '@ionic/storage-angular';
const CACHE_KEY = '_cache';
const TTL = 120;
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  constructor(private storage:Storage) {
    this.init()
  }
  isInit(){
    return this._storage != null;
  }
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.storage.defineDriver(cordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;

  }
  
  public set(key:string, value:any){
    this._storage?.set(key, value);
  }

  public get(key:string){
    return this._storage?.get(key) ? this._storage?.get(key) : null ;
  }

  public getToken(){
    return this._storage?.get('token') ? this._storage?.get('token') : null ;
  }

  public setToken(token:string){
    this._storage?.set('token', token);
  }
  
  async remove(key: string) {
    await this._storage?.remove(key);
  }

  async clear() {
    await this._storage?.clear();
  }

  async keys() {
    return await this._storage?.keys();
  }

  async length() {
    return await this._storage?.length();
  }
  
  cacheRequests(url:string,data:any){
    const validUntil = Date.now() + TTL * 1000;
    url = `${CACHE_KEY}:${url}`;
    return this.storage.set(url, {data, validUntil});
  }
  async getCachedRequests(url:string){
    url = `${CACHE_KEY}:${url}`;
    const cache = await this.storage.get(url);
    if(!cache){
      return null;
    }
    const isExpired = cache.validUntil < Date.now();
    const isCacheValid = !isExpired;
    if(isCacheValid){
      return cache.data;
    }else{
      await this.storage.remove(url);
      return null;
    }
  }

  async clearCachedData(){
    const keys = await this.storage.keys();
    const cacheKeys = keys.filter(key => key.startsWith(CACHE_KEY));
    cacheKeys.map(async key => await this.storage.remove(key));
  }

  async invalidateCacheEntry(url:string){
    url = `${CACHE_KEY}:${url}`;
    await this.storage.remove(url);
  }
}

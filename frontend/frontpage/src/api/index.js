/**
 * api管理
 */
import request from './../utils/request';
import User from './user';
import Article from './article';
import Web from './web';
export default {
    ...Web,
    ...User,
    ...Article
}
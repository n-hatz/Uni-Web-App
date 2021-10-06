import { combineReducers } from 'redux';

import auth from './auth';
import posts from './posts';
import depts from './depts';
import admin from './admin';

export const reducers = combineReducers({admin,posts, auth, depts});
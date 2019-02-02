// model/Comment.js
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Comment extends Model {
  static table = 'comments' // table to use
  @field('body') body // required so field will write correctly
}
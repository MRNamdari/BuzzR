import { Migration } from '@mikro-orm/migrations';

export class Migration20260514201532 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table "one_time_password" ("id" bigserial primary key, "user_id" bigint not null, "code" varchar(255) not null, "provider" varchar(255) not null, "created_at" timestamptz not null default now(), "used_at" timestamptz null);`);
    this.addSql(`create index "idx_one_time_password_created_at" on "one_time_password" ("created_at");`);

    this.addSql(`alter table "one_time_password" add constraint "one_time_password_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete cascade;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "one_time_password" cascade;`);
  }

}

import { Migration } from '@mikro-orm/migrations';

export class Migration20260516222732 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create type "integration_status" as enum ('disconnected', 'connecting', 'connected', 'error');`);
    this.addSql(`create type "log_level" as enum ('info', 'warn', 'error');`);
    this.addSql(`create table "platform_integrations" ("id" bigserial primary key, "platform" "integration_status" not null, "status" "integration_status" not null default 'disconnected', "config" jsonb not null default '{}', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "last_sync_at" timestamptz null);`);
    this.addSql(`create index "idx_integration_status" on "platform_integrations" ("platform");`);

    this.addSql(`create table "integration_webhook_events" ("id" bigserial primary key, "integration_id" bigint not null, "event_type" varchar(255) not null, "payload" jsonb not null, "recieved_at" timestamptz not null default now(), "proccessed_at" timestamptz null, "error" varchar(255) not null);`);

    this.addSql(`create table "integration_secrets" ("id" bigserial primary key, "integration_id" bigint not null, "key" varchar(255) not null, "value" text not null, "updated_at" timestamptz not null default now(), "created_at" timestamptz not null default now());`);

    this.addSql(`create table "integration_logs" ("id" bigserial primary key, "integration_id" bigint not null, "level" "log_level" not null default 'info', "message" text not null, "details" jsonb null, "created_at" timestamptz not null default now());`);

    this.addSql(`alter table "integration_webhook_events" add constraint "integration_webhook_events_integration_id_foreign" foreign key ("integration_id") references "platform_integrations" ("id") on update no action on delete cascade;`);

    this.addSql(`alter table "integration_secrets" add constraint "integration_secrets_integration_id_foreign" foreign key ("integration_id") references "platform_integrations" ("id") on update no action on delete cascade;`);

    this.addSql(`alter table "integration_logs" add constraint "integration_logs_integration_id_foreign" foreign key ("integration_id") references "platform_integrations" ("id") on update no action on delete cascade;`);

    this.addSql(`alter table "one_time_password" drop column "provider";`);
    this.addSql(`alter table "one_time_password" add "platform_id" bigint not null;`);
    this.addSql(`alter table "one_time_password" add constraint "one_time_password_platform_id_foreign" foreign key ("platform_id") references "platform_integrations" ("id") on update no action on delete no action;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "integration_webhook_events" drop constraint "integration_webhook_events_integration_id_foreign";`);
    this.addSql(`alter table "integration_secrets" drop constraint "integration_secrets_integration_id_foreign";`);
    this.addSql(`alter table "integration_logs" drop constraint "integration_logs_integration_id_foreign";`);
    this.addSql(`alter table "one_time_password" drop constraint "one_time_password_platform_id_foreign";`);

    this.addSql(`drop table if exists "platform_integrations" cascade;`);
    this.addSql(`drop table if exists "integration_webhook_events" cascade;`);
    this.addSql(`drop table if exists "integration_secrets" cascade;`);
    this.addSql(`drop table if exists "integration_logs" cascade;`);

    this.addSql(`alter table "one_time_password" drop column "platform_id";`);
    this.addSql(`alter table "one_time_password" add "provider" varchar(255) not null;`);

    this.addSql(`drop type "integration_status";`);
    this.addSql(`drop type "log_level";`);
  }

}

import { defineEntity, p } from "@mikro-orm/core";
import { Users } from "./Users";
import { BaseEntity } from "./Base";

const UserAttributesSchema = defineEntity({
  name: "user_attributes",
  extends: BaseEntity,
  indexes: [
    {
      name: "idx_user_attributes_key_bool",
      expression: (cols, table, indexName) =>
        `CREATE INDEX ${indexName} ON ${table.schema}.${table.name} USING btree (${cols.key}, ${cols.valueBool}) WHERE (${cols.valueBool} IS NOT NULL)`,
      properties: ["key", "valueBool"],
    },
    {
      name: "idx_user_attributes_key_num",
      expression: (cols, table, indexName) =>
        `CREATE INDEX ${indexName} ON ${table.schema}.${table.name} USING btree (${cols.key}, ${cols.valueNum}) WHERE (${cols.valueNum} IS NOT NULL)`,
      properties: ["key", "valueNum"],
    },
    {
      name: "idx_user_attributes_key_text",
      expression: (cols, table, indexName) =>
        `CREATE INDEX ${indexName} ON ${table.schema}.${table.name} USING btree (${cols.key}, ${cols.valueText}) WHERE (${cols.valueText} IS NOT NULL)`,
      properties: ["key", "valueText"],
    },
  ],
  uniques: [
    { name: "uq_user_attributes_user_key", properties: ["user", "key"] },
  ],
  properties: {
    user: () =>
      p.manyToOne(Users).ref().updateRule("no action").deleteRule("cascade"),
    key: p.string().length(100).index("idx_user_attributes_key"),
    valueText: p.text().nullable(),
    valueNum: p.decimal().nullable(),
    valueBool: p.boolean().nullable(),
    valueJson: p.json().nullable(),
  },
});

export class UserAttributes extends UserAttributesSchema.class {}

UserAttributesSchema.setClass(UserAttributes);

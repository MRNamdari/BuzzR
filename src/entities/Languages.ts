import { defineEntity, p } from "@mikro-orm/core";

const LanguagesSchema = defineEntity({
  name: "languages",
  properties: {
    id: p.bigint().primary(),
    name: p.string(),
    code: p.string().unique(),
  },
});

export class Languages extends LanguagesSchema.class {}

LanguagesSchema.setClass(Languages);

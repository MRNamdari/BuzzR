import { defineEntity, p } from "@mikro-orm/core";
import { Roles } from "./Roles";
import { Languages } from "./Languages";

const RolesTranslationsSchema = defineEntity({
  name: "roles_translations",
  uniques: [
    {
      name: "roles_translations_role_id_lang_key",
      properties: ["lang", "role"],
    },
  ],
  properties: {
    id: p.bigint().primary(),
    role: () =>
      p.manyToOne(Roles).ref().updateRule("no action").deleteRule("cascade"),
    lang: () =>
      p
        .manyToOne(Languages)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    name: p.string().length(50),
    description: p.text().nullable(),
  },
});

export class RolesTranslations extends RolesTranslationsSchema.class {}

RolesTranslationsSchema.setClass(RolesTranslations);

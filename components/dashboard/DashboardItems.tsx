import {
  LockOutlined as Lock,
  VerifiedUserOutlined as VerifiedUser,
  BadgeOutlined as Badge,
  GroupOutlined as Group,
  Inventory2Outlined as Inventory2,
  TuneOutlined as Tune,
  CategoryOutlined as Category,
  ViewModuleOutlined as ViewModule,
  WarehouseOutlined as Warehouse,
  SellOutlined as Sell,
  ShoppingBagOutlined as ShoppingBag,
  TravelExploreOutlined as TravelExplore,
  GroupsOutlined as Groups,
  LocalShippingOutlined as LocalShipping,
  HandshakeOutlined as Handshake,
  CampaignOutlined as Campaign,
  PermMediaOutlined as PermMedia,
  CollectionsOutlined as Collections,
  TranslateOutlined as Translate,
  HistoryOutlined as History,
  ReceiptLongOutlined as ReceiptLong,
  GavelOutlined as Gavel,
  EventAvailableOutlined as EventAvailable,
  ShoppingCartOutlined as ShoppingCart,
  BuildOutlined as Build,
  ExtensionOutlined as Extension,
  PublicOutlined as Public,
  PriceChangeOutlined as PriceChange,
  RedeemOutlined as Redeem,
  LayersOutlined as Layers,
  SettingsOutlined as Settings,
  SettingsApplicationsOutlined as SettingsApplications,
  ApiOutlined as Api,
  FactCheckOutlined as FactCheck,
  WebhookOutlined as Webhook,
  PlaceOutlined as Place,
  LocalOfferOutlined as LocalOffer,
  RuleOutlined as Rule,
} from "@mui/icons-material";

type DashboardItem = {
  title: string;
  icon: React.ReactNode;
  path: string;
  children?: DashboardItem[];
  params?: string[];
};
export const DashboardItems: DashboardItem[] = [
  {
    title: "catalog",
    icon: <Inventory2 fontSize="small" />,
    path: "catalog",
    children: [
      {
        title: "products",
        icon: <ShoppingBag fontSize="small" />,
        path: "catalog/products",
        params: ["new"],
      },
      {
        title: "categories",
        icon: <Category fontSize="small" />,
        path: "catalog/categories",
      },
      {
        title: "collections",
        icon: <ViewModule fontSize="small" />,
        path: "catalog/collections",
      },
      {
        title: "attributes",
        icon: <Tune fontSize="small" />,
        path: "catalog/attributes",
      },
      {
        title: "inventory",
        icon: <Warehouse fontSize="small" />,
        path: "catalog/inventory",
      },
      { title: "pricing", icon: <Sell fontSize="small" />, path: "pricing" },
      {
        title: "seo",
        icon: <TravelExplore fontSize="small" />,
        path: "catalog/seo",
      },
    ],
    params: [],
  },
  {
    title: "orders",
    icon: <ReceiptLong fontSize="small" />,
    path: "orders",
    params: [],
  },
  {
    title: "customers",
    icon: <Groups fontSize="small" />,
    path: "customers",

    params: [],
  },
  {
    title: "marketing",
    icon: <Campaign fontSize="small" />,
    path: "marketing",
    children: [
      {
        title: "campaigns",
        icon: <Campaign fontSize="small" />,
        path: "marketing/campaigns",
      },
      {
        title: "promotions",
        icon: <LocalOffer fontSize="small" />,
        path: "marketing/promotions",
      },
      {
        title: "shipping rules",
        icon: <Rule fontSize="small" />,
        path: "marketing/shipping-rules",
      },
    ],
    params: [],
  },
  {
    title: "media",
    icon: <PermMedia fontSize="small" />,
    path: "media",
    children: [
      {
        title: "sets",
        icon: <Collections fontSize="small" />,
        path: "media/sets",
      },
      { title: "tags", icon: <Sell fontSize="small" />, path: "media/tags" },
      {
        title: "translations",
        icon: <Translate fontSize="small" />,
        path: "media/translations",
      },
      {
        title: "versions",
        icon: <History fontSize="small" />,
        path: "media/versions",
      },
    ],
    params: [],
  },
  {
    title: "logistics",
    icon: <LocalShipping fontSize="small" />,
    path: "logistics",
    children: [
      {
        title: "locations",
        icon: <Place fontSize="small" />,
        path: "logistics/locations",
      },
      {
        title: "shipping",
        icon: <LocalShipping fontSize="small" />,
        path: "logistics/shipping",
      },
      {
        title: "suppliers",
        icon: <Handshake fontSize="small" />,
        path: "logistics/suppliers",
      },
      {
        title: "warehouses",
        icon: <Warehouse fontSize="small" />,
        path: "logistics/warehouses",
      },
    ],
    params: [],
  },
  {
    title: "rules",
    icon: <Gavel fontSize="small" />,
    path: "rules",
    children: [
      {
        title: "availability",
        icon: <EventAvailable fontSize="small" />,
        path: "rules/availability",
      },
      {
        title: "cart",
        icon: <ShoppingCart fontSize="small" />,
        path: "rules/cart",
      },
      {
        title: "custom",
        icon: <Build fontSize="small" />,
        path: "rules/custom",
      },
      {
        title: "features",
        icon: <Extension fontSize="small" />,
        path: "rules/features",
      },
      {
        title: "global",
        icon: <Public fontSize="small" />,
        path: "rules/global",
      },
      {
        title: "pricing",
        icon: <PriceChange fontSize="small" />,
        path: "rules/pricing",
      },
      {
        title: "promotions",
        icon: <Redeem fontSize="small" />,
        path: "rules/promotions",
      },
      {
        title: "shipping",
        icon: <LocalShipping fontSize="small" />,
        path: "rules/shipping",
      },
      {
        title: "tiers",
        icon: <Layers fontSize="small" />,
        path: "rules/tiers",
      },
    ],
    params: [],
  },
  {
    title: "access",
    icon: <Lock fontSize="small" />,
    path: "access",
    children: [
      {
        title: "permissions",
        icon: <VerifiedUser fontSize="small" />,
        path: "access/permissions",
      },
      {
        title: "roles",
        icon: <Badge fontSize="small" />,
        path: "access/roles",
      },
      {
        title: "users",
        icon: <Group fontSize="small" />,
        path: "access/users",
      },
    ],
    params: [],
  },
  {
    title: "system",
    icon: <Settings fontSize="small" />,
    path: "system",
    children: [
      { title: "api", icon: <Api fontSize="small" />, path: "system/api" },
      {
        title: "audit",
        icon: <FactCheck fontSize="small" />,
        path: "system/audit",
      },
      {
        title: "system settings",
        icon: <SettingsApplications fontSize="small" />,
        path: "system/settings",
      },
      {
        title: "webhooks",
        icon: <Webhook fontSize="small" />,
        path: "system/webhooks",
      },
    ],
    params: [],
  },
] as const;

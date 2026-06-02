"use client";

import { Typography, Container, Button, Grid } from "@mui/material";
import NextLink from "next/link";
import ProductBundlesCard from "@/components/dashboard/products/BundlesCard";
import ProductAttributesCard from "@/components/dashboard/products/AttributesCard";
import ProductAvailablityRulesCard from "@/components/dashboard/products/AvailablityRulesCard";
import ProductInventoryCard from "@/components/dashboard/products/InventoryCard";
import ProductMediaCard from "@/components/dashboard/products/MediaCard";
import ProductRelationsCard from "@/components/dashboard/products/RelationsCard";
import ProductVariationsCard from "@/components/dashboard/products/VariationsCard";
import ProductVersionsCard from "@/components/dashboard/products/VersionsCard";
import ProductPricingCard from "@/components/dashboard/products/PricingCard";
import ProductSEOCard from "@/components/dashboard/products/SEOCard";
import ProductStatusHistoryCard from "@/components/dashboard/products/StatusHistoryCard";

export default function ProductsPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h6">Products Page</Typography>
      <Button LinkComponent={NextLink} href="./products/new">
        + Add Product
      </Button>
      <Grid container spacing={3}>
        <ProductVariationsCard />
        <ProductPricingCard />
        <ProductAttributesCard />
        <ProductMediaCard />
        <ProductBundlesCard />
        <ProductRelationsCard />
        <ProductSEOCard />
        <ProductAvailablityRulesCard />
        <ProductInventoryCard />
        <ProductVersionsCard />
        <ProductStatusHistoryCard />
      </Grid>
    </Container>
  );
}

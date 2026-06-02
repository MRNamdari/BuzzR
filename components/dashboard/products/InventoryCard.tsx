import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import NextLink from "next/link";
export default function ProductInventoryCard() {
  return (
    <Card sx={{ minWidth: 345 }}>
      <CardActionArea component={NextLink} href="./products/inventory">
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h6" component="div">
            Inventory
          </Typography>
          <CardMedia>
            <WarehouseRoundedIcon fontSize="large" />
          </CardMedia>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" LinkComponent={NextLink}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
}

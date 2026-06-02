import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import NextLink from "next/link";
export default function ProductSEOCard() {
  return (
    <Card sx={{ minWidth: 345 }}>
      <CardActionArea component={NextLink} href="./products/seo">
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h6" component="div">
            SEO
          </Typography>
          <CardMedia>
            <TravelExploreRoundedIcon fontSize="large" />
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

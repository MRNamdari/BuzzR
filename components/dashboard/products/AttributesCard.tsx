import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import NextLink from "next/link";
export default function ProductAttributesCard() {
  return (
    <Card
      sx={{
        minWidth: 345,
        // borderRadius: (t) => t.shape.borderRadius
      }}
    >
      <CardActionArea component={NextLink} href="./products/attributes">
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h6" component="div">
            Attributes
          </Typography>
          <CardMedia>
            <TuneRoundedIcon fontSize="large" />
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

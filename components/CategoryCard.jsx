import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CategoryCard = ({ title, img, navigateTo, url }) => {
  return (
    <Card sx={{ maxWidth: 330, minWidth: 280 }}>
      <CardActionArea position="relative" onClick={() => navigateTo(url)}>
        <CardMedia
          component="img"
          height="260"
          image={img}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h1"
            component="div"
            position={"absolute"}
            sx={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;

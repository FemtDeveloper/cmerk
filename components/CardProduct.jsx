import Image from "next/image";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  Link,
  List,
  Typography,
} from "@mui/material";
import { FavoriteOutlined } from "@mui/icons-material";
import { tesloApi } from "api";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const CardProduct = ({
  id = "",
  title = "",
  images = "",
  cantidad = "",
  medidas = "",
  categoria = "",
  price = 0,
  slug = "",
  favorite = false,
  inStock = 0,
  brand = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { favoriteProducts, phoneNumber, role } = useSelector(
    (state) => state.user
  );
  const { push } = useRouter();

  useEffect(() => {
    favoriteProducts.map((fav) => {
      if (fav.id === id) {
        setIsFavorite(true);
      }
    });
  }, [favoriteProducts, id]);

  const onFavorite = async (e) => {
    setIsFavorite(!isFavorite);
    e.preventDefault();
    try {
      const { data } = await tesloApi({
        url: "/products",
        method: "PUT", // si tenemos un _id, entonces actualizar, si no crear
        data: { productId: id },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const toDelete = { id, images };

  const onDeleteProduct = async () => {
    const { data } = await tesloApi({
      url: "/edit/products",
      method: "DELETE",
      data: toDelete,
    });
  };
  const onEditButton = () => {
    push(`/productos/edit/${slug}`);
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          position: "relative",
          backgroundColor: "#f7f7f7",
          paddingTop: "10px",
        }}
      >
        <NextLink href={`/productos/${id}`}>
          <Link>
            <CardActionArea
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CardMedia
                style={{
                  width: "100%",
                  height: "300px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Image
                    src={images[0]}
                    alt={title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </CardMedia>
            </CardActionArea>
          </Link>
        </NextLink>

        <IconButton
          sx={{
            color: isFavorite ? "#d50707" : "#5e4e4ee0",
            position: "absolute",
            right: "2px",
            cursor: "pointer",
            zIndex: 20,
          }}
          onClick={onFavorite}
        >
          <FavoriteOutlined />
        </IconButton>

        <List sx={{ paddingX: "20px" }}>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="h4" sx={{ fontWeight: 600 }} display="flex">
            Precio:{"  "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(parseInt(price) ?? 0)}
          </Typography>
          <Typography variant="h4">
            <strong> Presentación:</strong> {cantidad} {medidas}
          </Typography>

          <Typography variant="h4">
            <strong> Categoría:</strong> {categoria}
          </Typography>
        </List>
        <Typography
          variant="h4"
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={2}
          paddingX={2}
          textTransform="capitalize"
        >
          <span>
            Marca: {"  "}
            <NextLink href={`/marcas/${brand}`} passHref>
              <Link color={"#160981"} fontWeight={550} underline="always">
                {brand}
              </Link>
            </NextLink>
          </span>
        </Typography>
        {role === "admin" && (
          <Typography
            display={"flex"}
            justifyContent="space-around"
            mb={2}
            mr={2}
          >
            <span onClick={onEditButton} className="edit-button">
              Editar producto
            </span>
            <span onClick={() => onDeleteProduct(id)} className="delete-button">
              Eliminar
            </span>
          </Typography>
        )}
      </Card>
    </Grid>
  );
};
CardProduct.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  guests: PropTypes.number,
  beds: PropTypes.number,
  baths: PropTypes.number,
  price: PropTypes.string,
  favorite: PropTypes.bool,
  onClickFavorite: PropTypes.func,
};

export default CardProduct;

import NextLink from "next/link";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ClearOutlined,
  MenuOutlined,
  PersonOutlineOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UiContext } from "context";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteProducts } from "store/user";

export const Navbar = (gender = "", isMenuOpen, setIsMenuOpen) => {
  const { toggleSideMenu } = useContext(UiContext);
  const { pathname, push } = useRouter();

  const dispatch = useDispatch();
  const { favoriteProducts } = useSelector((state) => state.user);
  console.log(favoriteProducts);
  useEffect(() => {
    dispatch(getFavoriteProducts());
  }, [dispatch]);

  // todo: needs some memo?
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography
              variant="h6"
              sx={{
                display: { xs: "flex", sm: "flex", md: "none" },
              }}
            >
              C-Merca
            </Typography>
            <Typography
              variant="h2"
              color="secondary"
              sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
            >
              C-
            </Typography>
            <Typography
              sx={{ ml: 0.2, display: { xs: "none", sm: "none", md: "flex" } }}
              variant="h3"
              color="info"
            >
              Merca
            </Typography>
          </Link>
        </NextLink>
        <Box flex={1} />

        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
          className="fadeIn"
        >
          <NextLink href="/categoria/lacteos" passHref>
            <Link>
              <Button
                sx={{
                  backgroundColor:
                    pathname === "/categoria/lacteos" ? "info" : "",
                  color: pathname === "/categoria/lacteos" ? "" : "info",
                  padding: { sm: "2px 5px", md: "10px 20px" },
                  fontSize: { sm: "16px" },
                }}
              >
                Lacteos
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/categoria/despensa" passHref>
            <Link>
              <Button
                sx={{
                  backgroundColor:
                    pathname === "/categoria/despensa" ? "info" : "",
                  color: pathname === "/categoria/despensa" ? "" : "info",
                  padding: { xs: "2px 5px", md: "10px 20px" },
                  fontSize: { sm: "16px" },
                }}
              >
                Despensa
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/categoria/frutas-y-verduras" passHref>
            <Link>
              <Button
                sx={{
                  backgroundColor:
                    pathname === "/categoria/frutas-y-verduras" ? "info" : "",
                  color:
                    pathname === "/categoria/frutas-y-verduras" ? "" : "info",
                  padding: { sm: "2px 5px", md: "10px 20px" },
                  fontSize: { sm: "16px" },
                }}
              >
                Frutas y Verduras
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/categoria/carne-pollo-y-pescado" passHref>
            <Link>
              <Button
                sx={{
                  backgroundColor:
                    pathname === "/categoria/carne-pollo-y-pescado"
                      ? "info"
                      : "",
                  color:
                    pathname === "/categoria/carne-pollo-y-pescado"
                      ? ""
                      : "info",
                  padding: { sm: "2px 5px", md: "10px 20px" },
                  fontSize: { sm: "16px" },
                }}
              >
                Carne, Pollo y Pescado
              </Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" }, color: "info" }}
            className="fadeIn"
            autoFocus={true}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined sx={{ color: "info" }} />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <SearchOutlined color="success" />
          </IconButton>
        )}
        <IconButton
          color="success"
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined sx={{ color: "info" }} />
        </IconButton>
        <IconButton onClick={toggleSideMenu}>
          <PersonOutlineOutlined color="success" />
          {/* <MenuOutlined sx={{ color: "info" }} /> */}
        </IconButton>

        {/* <Button
          color="success"
          onClick={toggleSideMenu}
          sx={{ display: { xs: "none", sm: "flex" } }}
        ></Button> */}
      </Toolbar>
    </AppBar>
  );
};

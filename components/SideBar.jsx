import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  EscalatorWarningOutlined,
  FemaleOutlined,
  MaleOutlined,
  PersonOutlineOutlined,
  SearchOutlined,
} from "@mui/icons-material";

import { useRouter } from "next/router";
import { UiContext } from "context";
import { signOut, useSession } from "next-auth/react";
import { AuthContext } from "context/auth";
import { useSelector } from "react-redux";

export const SideMenu = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { push, pathname } = useRouter();
  const { status } = useSession();
  const { isMenuOpen, toggleSideMenu, toggleSigninModal, toggleRegisterModal } =
    useContext(UiContext);
  const { user } = useContext(AuthContext);
  let userName;
  if (user) {
    userName = user.name.split(" ")[0];
  }
  const { role } = useSelector((state) => state.user);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url) => {
    toggleSideMenu();
    push(url);
  };
  const onLogout = () => {
    signOut();
    push("/");
  };

  useEffect(() => {
    if (status === "authenticated") {
      setIsLogged(true);
    }
  }, [status]);

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{
        backdropFilter: "blur(4px)",
        transition: "all 0.5s ease-out",
        zIndex: 100,
      }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5, zIndex: 2 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined sx={{ color: "#ed47dd" }} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLogged ? (
            <>
              <ListItem>
                <ListItemText primary={`¡Hola ${userName}!`} />
              </ListItem>
              <ListItem button onClick={() => navigateTo("/usuario/mi-cuenta")}>
                <ListItemIcon>
                  <PersonOutlineOutlined sx={{ color: "#ed47dd" }} />
                </ListItemIcon>
                <ListItemText primary={"Mi Cuenta"} />
              </ListItem>
              <ListItem
                button
                onClick={() => navigateTo("/usuario/mis-favoritos")}
              >
                <ListItemText
                  primary={`Mis Favoritos`}
                  sx={{ fontWeight: 600 }}
                />
              </ListItem>
              {role === "admin" && (
                <>
                  <NextLink href="/create" passHref>
                    <Link>
                      <ListItem
                        onClick={toggleSideMenu}
                        sx={{
                          backgroundColor:
                            pathname === "/create" ? "##fdd101" : "#7600a1",
                          color: pathname === "/create" ? "#7600a1" : "#fdd101",
                          padding: { sm: "5px 10px", md: "10px 20px" },
                        }}
                      >
                        Agregar Producto
                      </ListItem>
                    </Link>
                  </NextLink>
                  <NextLink href="/admin/admin-products" passHref>
                    <Link>
                      <ListItem
                        onClick={toggleSideMenu}
                        sx={{
                          backgroundColor:
                            pathname === "/create" ? "##fdd101" : "#7600a1",
                          color: pathname === "/create" ? "#7600a1" : "#fdd101",
                          padding: { sm: "5px 10px", md: "10px 20px" },
                        }}
                      >
                        Administrar productos
                      </ListItem>
                    </Link>
                  </NextLink>
                </>
              )}
            </>
          ) : (
            <ListItem button onClick={toggleSigninModal}>
              <ListItemIcon>
                <EscalatorWarningOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItem>
          )}

          {isLogged && (
            <ListItem
              button
              onClick={onLogout}
              // sx={{
              //   backgroundColor: "#7600a1",
              //   color: "#fdd101",
              //   padding: { sm: "5px 10px", md: "10px 20px" },
              // }}
            >
              <ListItemText primary={"Cerrar Sesión"} />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

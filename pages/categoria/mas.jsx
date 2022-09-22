import CategoryCard from "@/components/CategoryCard";
import Layout from "Layouts/Layout";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

const categories = [
  { title: "Lacteos", img: "/lacteos.png", url: "/categoria/lacteos" },
  { title: "Licores", img: "/viejo-caldas.webp", url: "/categoria/licores" },
  {
    title: "Frutas y Verduras",
    img: "/cebolla.webp",
    url: "/categoria/frutas-y-verduras",
  },
  { title: "Despensa", img: "/grain.png", url: "/categoria/despensa" },
  {
    title: "Carnes",
    img: "/carnes.png",
    url: "/categoria/carne-pollo-y-pescado",
  },
];

const Mas = () => {
  const { push } = useRouter();

  const navigateTo = (url) => {
    push(url);
  };
  return (
    <Layout>
      <Grid container spacing={4} display="flex" justifyContent="center">
        {categories.map((category) => (
          <Grid item key={category.title} sx={{ padding: 0 }}>
            <CategoryCard
              title={category.title}
              img={category.img}
              url={category.url}
              navigateTo={navigateTo}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Mas;

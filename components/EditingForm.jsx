import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { SaveOutlined, UploadOutlined } from "@mui/icons-material";

import { miApi } from "api";
import { revalidatePage } from "helpers";

const categorias = [
  "Lacteos",
  "Granos",
  "Carnes",
  "Higiene",
  "Aseo",
  "Licores",
  "Frutas y verduras",
  "Snacks",
  "Mascotas",
  "Aceites y grasas",
  "Harinas",
  "Despensa",
];
const medidas = [
  "Litros",
  "Mililitros",
  "Kilogramos",
  "Libras",
  "Gramos",
  "Unidades",
];

const EditingForm = ({ product }) => {
  const router = useRouter();
  const fileInputRef = useRef();
  const [focused, setFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: product,
  });

  const onFilesSelected = async ({ target }) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await miApi.post("/image-upload2", formData);
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const onSubmit = async (form, e) => {
    if (form.images.length < 1) return alert("Debes agregar una imágen");
    // setIsSaving(true);
    e.preventDefault();

    try {
      const { data } = await miApi({
        url: "/edit/products",
        method: "PUT", // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });

      toast("¡Producto Actualizado con exito!", {
        icon: "👏",
      });
      // router.reload();
      // router.replace(`/productos/${data.id}`);
      // revalidatePage();
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  const onChangeCategoria = ({ target }) => {
    setValue("categoria", target.value, { shouldValidate: true });
    const currentCategoria = getValues("categoria");
  };
  const onChangeMedida = ({ target }) => {
    setValue("medidas", target.value, { shouldValidate: true });
    const currentMedida = getValues("medidas");
  };

  const onDeleteImage = async () => {
    await miApi({
      url: "/edit/delete-image",
      method: "PUT",
      data: product,
    });
    setValue("images", [], { shouldValidate: true });
  };

  // const onNewTag = () => {
  //   const newTag = newTagValue.trim().toLocaleLowerCase();
  //   setNewTagValue("");
  //   const currentTags = getValues("tags");

  //   if (currentTags.includes(newTag)) {
  //     return;
  //   }

  //   currentTags.push(newTag);
  // };
  // const onDeleteTag = (tag) => {
  //   const updatedTags = currentTags.filter((t) => t !== tag);
  //   setCurrentTags(updatedTags);
  // };
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "title") {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
            .toLocaleLowerCase() || "";

        setValue("slug", newSlug);
        setFocused(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        justifyContent="end"
        sx={{
          mb: 1,
          padding: "10px 90px",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Button
          startIcon={<SaveOutlined />}
          sx={{ width: "150px" }}
          type="submit"
        >
          Actualizar
        </Button>
      </Box>
      <Grid container spacing={2}>
        {/* Data */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Título"
            variant="filled"
            fullWidth
            sx={{ mb: 1 }}
            {...register("title", {
              required: "Este campo es requerido",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Descripción"
            variant="filled"
            fullWidth
            multiline
            sx={{ mb: 1 }}
            {...register("description", {
              required: "Este campo es requerido",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          {/* <TextField
            label="Inventario"
            type="number"
            variant="filled"
            fullWidth
            sx={{ mb: 1 }}
            {...register("inStock", {
              required: "Este campo es requerido",
              min: { value: 0, message: "Mínimo de valor cero" },
            })}
            error={!!errors.inStock}
            helperText={errors.inStock?.message}
          /> */}

          <TextField
            label="Precio"
            type="number"
            variant="filled"
            fullWidth
            sx={{ mb: 1 }}
            {...register("price", {
              required: "Este campo es requerido",
              min: { value: 0, message: "Mínimo de valor cero" },
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <FormControl sx={{ mb: 1 }}>
            <FormLabel>Unidad de Medida</FormLabel>
            <RadioGroup
              row
              value={getValues("medidas")}
              onChange={onChangeMedida}
            >
              {medidas.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={capitalize(option)}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <TextField
            label="Cantidad por unidad"
            type="number"
            variant="filled"
            fullWidth
            sx={{ mb: 1 }}
            {...register("cantidad", {
              required: "Este campo es requerido",
              min: { value: 0, message: "Mínimo de valor cero" },
            })}
            error={!!errors.cantidad}
            helperText={errors.cantidad?.message}
          />

          <Divider sx={{ my: 1 }} />

          <FormControl sx={{ mb: 1 }}>
            <FormLabel>Categoría</FormLabel>
            <RadioGroup
              row
              value={getValues("categoria")}
              onChange={onChangeCategoria}
            >
              {categorias.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={capitalize(option)}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* <FormControl>
            <FormLabel color="info">Tallas</FormLabel>
            <FormGroup row>
              {sizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox color="info" />}
                  label={size}
                  onChange={() => onChangeSize(size)}
                />
              ))}
            </FormGroup> 
          </FormControl>*/}
        </Grid>

        {/* Tags e imagenes */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Marca"
            type="text"
            variant="filled"
            fullWidth
            sx={{ mb: 1 }}
            {...register("brand", {
              required: "Este campo es requerido",
              min: { value: 0, message: "Mínimo de valor cero" },
            })}
            error={!!errors.brand}
            helperText={errors.brand?.message}
          />
          {/* <TextField
            label="Slug - URL"
            variant="filled"
            fullWidth
            sx={{ mb: 1 }}
            {...register("slug", {
              required: "Este campo es requerido",
              validate: (val) =>
                val.trim().includes(" ")
                  ? "No puede tener espacios en blanco"
                  : undefined,
            })}
            error={!!errors.slug}
            helperText={errors.slug?.message}
            focused={focused}
          />

          <TextField
            label="Etiquetas"
            variant="filled"
            fullWidth
            sx={{ mb: 1 }}
            helperText="Presiona [spacebar] para agregar"
            value={newTagValue}
            onChange={({ target }) => setNewTagValue(target.value)}
            onKeyUp={({ code }) => (code === "Space" ? onNewTag() : undefined)}
          /> */}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0,
              m: 0,
            }}
            component="ul"
          >
            {/* {getValues("tags").map((tag) => {
              return (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => onDeleteTag(tag)}
                  color="primary"
                  size="small"
                  sx={{ ml: 1, mt: 1 }}
                />
              );
            })} */}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" flexDirection="column">
            <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
            <Button
              fullWidth
              startIcon={<UploadOutlined />}
              sx={{ mb: 3 }}
              onClick={() => fileInputRef.current?.click()}
            >
              Cargar imagen
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png, image/gif, image/jpeg"
              style={{ display: "none" }}
              onChange={onFilesSelected}
            />
            {/* <ImageUpload
              // initialImage={{ src: image | null, alt: initialFormValues.title }}
              initialImage={null}
              onChangePicture={upload}
            /> */}

            <Chip
              label="Es necesario al menos 1 imagen"
              color="error"
              variant="outlined"
              sx={{
                display: getValues("images").length < 1 ? "flex" : "none",
              }}
            />

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {getValues("images").map((img) => (
                <Grid item xs={4} sm={3} key={img}>
                  <Card>
                    <CardMedia
                      component="img"
                      className="fadeIn"
                      image={img}
                      alt={img}
                    />
                    <CardActions>
                      <Button
                        fullWidth
                        color="error"
                        onClick={() => onDeleteImage(img)}
                      >
                        Borrar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box
        justifyContent="end"
        sx={{
          mb: 1,
          padding: "10px 90px",
          display: { xs: "flex", sm: "none" },
        }}
      >
        <Button
          startIcon={<SaveOutlined />}
          sx={{ width: "150px" }}
          type="submit"
        >
          Guardar
        </Button>
      </Box>
    </form>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps = async ({ query }) => {
//   const { slug = "" } = query;

//   let product;

//   if (slug === "new") {
//     // crear un producto
//     const tempProduct = JSON.parse(JSON.stringify(new Product()));
//     delete tempProduct._id;
//     tempProduct.images = ["img1.jpg", "img2.jpg"];
//     product = tempProduct;
//   } else {
//     product = await dbProducts.getProductBySlug(slug.toString());
//   }

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/admin/products",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export default EditingForm;

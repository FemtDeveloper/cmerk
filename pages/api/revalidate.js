export default async function handler(req, res) {
  let revalidated = false;
  try {
    await res.revalidate("/");

    return res.json({ revalidated: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error revalidating" });
  }
}

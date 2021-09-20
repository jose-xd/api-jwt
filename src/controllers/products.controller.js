import Product from '../schemas/Product'

export const createProduct = async (req, res) => {
    try {
        const { name, category, price, imgUrl } = req.body;

        const newProduct = new Product({ name, category, price, imgUrl });

        const productSaved = await newProduct.save()
            .catch(err => { return res.status(500).json(err) });
        if (!productSaved) return res.status(500).json("not found")
        res.status(201).json(productSaved);
    } catch {
        res.status(500)
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .catch(err => { return res.status(500).json(err) });
        if (!products) return res.status(500).json("not found")
        res.json(products);
    } catch {
        res.status(500)
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
            .catch(err => { return res.status(500).json(err) });
        if (!product) return res.status(500).json("not found")
        res.status(200).json(product);
    } catch {
        res.status(500)
    }
}

export const updateProductById = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })
            .catch(err => res.status(500).json("not found"));
        if (!updatedProduct) return res.status(500).json("not found")
        res.status(200).json(updatedProduct);
    } catch {
        res.status(500)
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
            .catch(err => res.status(500).json("not found"));
        if (!deletedProduct) return res.status(500).json("not found")
        res.status(204).json()
    } catch {
        res.status(500)
    }
}
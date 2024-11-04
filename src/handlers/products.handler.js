import productController from '../dao/products.controller.js';

class ProductHandler {
    async getProducts(req, res) {
        try {
          const { limit = 10, page = 1, sort, query } = req.query;
          const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            lean: true
          };
    
          if (sort) {
            options.sort = { price: sort === 'asc' ? 1 : -1 };
          }
    
          let filter = {};
          if (query) {
            filter = { $or: [{ category: query }, { status: query }] };
          }
    
          const result = await productController.getProducts(options, filter);
    
          const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    
          res.status(200).json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl}?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: result.hasNextPage ? `${baseUrl}?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null
          });
        } catch (error) {
          console.error('Error en getProducts:', error);
          res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
      }
    

  async getProductById(req, res) {
    try {
      const { pid } = req.params;
      const product = await productController.getProductById(pid);
      if (!product) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.status(200).json({ status: 'success', payload: product });
    } catch (error) {
      console.error('Error en getProductById:', error);
      res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
  }

  async addProduct(req, res) {
    try {
      const newProduct = await productController.addProduct(req.body);
      res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
      console.error('Error en addProduct:', error);
      res.status(500).json({ status: 'error', message: 'Error al agregar el producto' });
    }
  }

  async updateProduct(req, res) {
    try {
      const { pid } = req.params;
      const updatedProduct = await productController.updateProduct(pid, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.status(200).json({ status: 'success', payload: updatedProduct });
    } catch (error) {
      console.error('Error en updateProduct:', error);
      res.status(500).json({ status: 'error', message: 'Error al actualizar el producto' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { pid } = req.params;
      const deletedProduct = await productController.deleteProduct(pid);
      if (!deletedProduct) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error('Error en deleteProduct:', error);
      res.status(500).json({ status: 'error', message: 'Error al eliminar el producto' });
    }
  }
}

export default ProductHandler
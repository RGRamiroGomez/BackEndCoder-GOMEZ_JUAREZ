import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config.js';

const dir = `${config.DIRNAME}/data/carts.json`;

export class CartManager {
    
    // Método para leer todos los carritos
    getCarts = async () => {
        try {
            const dataFile = await fs.open(dir, 'r+');
            const data = await dataFile.readFile('utf-8');
            if (!data) {
                const error = new Error('No se encontraron carritos');
                error.status = 404;
                throw error;
            }
            const carts = JSON.parse(data);
            await dataFile.close();
            return carts;
        } catch (error) {
            throw error;
        }
    }

    // Método para agregar un nuevo carrito
    addCart = async (cartData) => {
        if (!cartData.hasOwnProperty('products')) {
            const error = new Error('Formato incorrecto de carrito');
            error.status = 400;
            throw error;
        }
        const carts = await this.getCarts();
        const newCart = { id: uuidv4(), products: cartData.products };
        carts.push(newCart);
        await fs.writeFile(dir, JSON.stringify(carts, null, 2));
        return newCart;
    }

    // Método para obtener un carrito por ID
    getCartById = async (cid) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === cid);
        if (!cart) {
            const error = new Error('Carrito no encontrado');
            error.status = 404;
            throw error;
        }
        return cart;
    }

    // Método para agregar un producto a un carrito
    addProductToCart = async (cid, pid, quantity) => {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cid);
        if (cartIndex === -1) {
            const error = new Error('Carrito no encontrado');
            error.status = 404;
            throw error;
        }

        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex(product => product.pid === pid);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ pid: pid, quantity: quantity });
        }

        await fs.writeFile(dir, JSON.stringify(carts, null, 2));
        return cart;
    }
}
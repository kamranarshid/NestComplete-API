import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductService{
   private product:Product[] = [];

    insertProduct(title: string,  desc: string,  price: number ){
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId,title, desc, price);
        this.product.push(newProduct);
        return prodId;
    }

    fetchProducts(){
        return [...this.product];
    }

    getSingleProduct(productId: string){
        const product = this.findProduct(productId[0]);
        return { ...product };
    }

    updateProduct(productId: string,title: string, desc: string,price: number){
        const [product, index] = this.findProduct(productId);
        const updateProduct = {...product};
        if(title){
            updateProduct.title = title;
        }
        if(desc){
            updateProduct.desc = desc;
        }
        if(price){
            updateProduct.price = price;
        }
        this.product[index] = updateProduct;
        
    }

    deleteProduct(productId: string){
        const [_, index] = this.findProduct(productId);
        this.product.slice(index, 1);

    }
    
    private findProduct(productId: string): [Product, number]{
        const productIndex = this.product.findIndex((prod) => prod.id === productId);
        
        const product = this.product[productIndex];
        if(!product){
            throw new NotFoundException('No data found'); 
        }
        return [product, productIndex];
    }

}
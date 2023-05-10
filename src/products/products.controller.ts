import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { ProductService} from "./product.service";

@Controller('products')
export class ProductController{
    constructor(private readonly productService: ProductService){}
    
    @Post()
    addProduct(@Body('title') prodTitle: string,
                @Body('desc') prodDesc: string,
                 @Body('price') prodPrice: number): any{
        const myId = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: myId}
    }

    @Get()
    getAllProducts(){
        return this.productService.fetchProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string){
        return this.productService.getSingleProduct(prodId);
    }
    @Patch(':id')
    updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string, @Body('price') prodPrice: number){
        this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;

    }
    @Delete(':id')
    deleteProduct (@Param('id') prodId: string){
        this.productService.deleteProduct(prodId);
        return null;
    }

}
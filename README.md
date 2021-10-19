# E-commerce Back End

## **Description**
The E-commerce Backend application is a solution for storing the data you need for your E-commerce. This app makes it easy to view, add, label, and delete items from your database while providing some API routes.

## **what can you do?**
### Add to your database (POST)

- there's the option of adding categories, products, and tags for your products.
type in the URL ```http://localhost:3001/api/``` followed by the endpoint you want to add to., for example ```http://localhost:3001/api/categories```
- NOTE: Always check the model for that specific endpoint to know which property to insert into the request's body.


### Delete records (DELETE)

- you will never need to worry if something is out of stock or the last item is lost. Delete it from your database with just the URL ```http://localhost:3001/api/``` followed by the endpoint you want to delete from and the id of the unwanted record like this example ```http://localhost:3001/api/products/1```

### Update records (PUT)

To Update a category, product, a product's tag, or a tag in general, follow the same procedure provided in the Delete records section above. The only difference is to use PUT instead of delete.

### Checking your database (GET)

No. You don't need to go to that command line, enter your password and write some commands to get information, just put in the command ```http://localhost:3001/api/``` followed by the endpoint to check everything related to that endpoint and add a ```/<number>``` after that to get a specific record from that same endpoint. 
for example: ```http://localhost:3001/api/tags/1``` 

## Demonstration 
Check out this [video](https://drive.google.com/file/d/1obryJZNLSpo2LLJLWs3dp8e_3hhuujgz/view?usp=sharing) for further demonstration!

## Links
- [GitHub Repo](https://github.com/Makispear/ecommerce-backend)
- reach out through [email](mailto:maki-miko@hotmail.com)

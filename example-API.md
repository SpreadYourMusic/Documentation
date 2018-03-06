# TODO

Pasar la autentificación de token en body a cookie en header

# Objetos JSON comunes

## Información perfil

### Esquema
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "ProfileModel",
  "type": "object",
  "properties": {
    "profile": {
      "type": "object",
      "properties": {
        "public_profile" : { "type": "boolean" },
        "user": { "type": "string" },
        "name": { "type": "string" },
        "mail": { "type": "string" },
        "mail_visible": { "type": "boolean" },
        "public_rate": { "type": "number" },
        "description": { "type": "string" }
      }
    }
  }
}
```

### Ejemplo
```
{
  "profile":{
    "public_profile" : true,
    "user": "user123",
    "name": "Manolo Escobar",
    "mail": "manolo@mail.m",
    "mail_visible": false,
    "public_rate": 8.5,
    "description": "Lorem ipsum"
  }
}
```

## Producto

### Esquema
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "ProductModel",
  "type": "object",
  "properties": {
    "product": {
      "type": "object",
      "properties": {
        "id": { "type": "integer" },
        "name": { "type": "string" },
        "public_rate": { "type": "number" },
        "description": { "type": "string" },
        "category": {
          "type": "array",
          "items": { "type": "string" }
        },
        "tags": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    }
  }
}
```

### Ejemplo
```
{
  "product": {
    "id": 123,
    "name": "Estufa robótica",
    "public_rate": 5.6,
    "description": "Muy bonita y calentita",
    "category": [ "laptop", "keyboard" ],
    "tags": [ "domotica", "inteligente", "hogar", "estufa", "robotica" ]
  }
}
```

## Comentario

Incluye el identificador del comentario, el producto al que referencia, el usuario que escribe el comentario y el contenido del comentario.

### Esquema
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "CommentModel",
  "type": "object",
  "properties": {
    "comment": {
      "type": "object",
      "properties": {
        "id": { "type": "integer" },
        "product": { "type": "integer" },
        "user": { "type": "string" },
        "title": { "type": "string" },
        "rate": { "type": "number" },
        "text": { "type": "string" }
      }
    }
  }
}
```

### Ejemplo
```
{
  "comment": {
    "id": 12345,
    "product": 6789,
    "user": "ermenegildo",
    "title": "Obra maestra de la ciencia",
    "rate": 8.8,
    "text": "Lorem ipsum ....."
  }
}
```

## Like

Incluye el identificador del like, el comentario al que referencia, el usuario que da el like y la nota que pone.

### Esquema
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "LiketModel",
  "type": "object",
  "properties": {
    "like": {
      "type": "object",
      "properties": {
        "id": { "type": "integer" },
        "comment": { "type": "integer" },
        "user": { "type": "string" },
        "rate": { "type": "number" }
      }
    }
  }
}
```

### Ejemplo
```
{
  "like": {
    "id": 1111,
    "comment": 12345,
    "user": "rodolfo",
    "rate": 5.0
  }
}
```

## Vendor

### Esquema
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "VendorModel",
  "type": "object",
  "properties": {
    "vendor": {
      "type": "object",
      "properties": {
        "id": { "type": "integer" },
        "name": { "type": "string" },
        "url": { "type": "string" },
        "rate": { "type": "number" }
      }
    }
  }
}
```

### Ejemplo
```
{
  "vendor": {
    "id": 1111,
    "name": "Amazon",
    "url": "amazon.es",
    "rate": 5.0
  }
}
```

# Interfaces

Para loc sódigos de error seguir http://www.restapitutorial.com/lessons/httpmethods.html

## /signup

`POST /signup`

Esquema contenido del post:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "user": { "type": "string" },
    "mail": { "type": "string" },
    "pass": { "type": "string" }
  }
}
```

Crea una cuenta si el user está libre y devuelve un token de sesión:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "token": { "type": "string" }
    "profile": { "type": "ProfileModel" }
  }
}
```

## /login

`POST /login`

Esquema contenido del post:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "user": { "type": "string" },
    "pass": { "type": "string" }
  }
}
```

Si la autenificación es correcta, devuelve un token de sesión:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "user": {"type": "string" }
    "token": { "type": "string" }
  }
}
```

`DELETE /login`

Esquema contenido del post:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "user": {"type": "string" }
    "token": { "type": "string" }
  }
}
```
Si el token es válido, lo inhabilita, cerrando la sesión.

## /users

`GET /users/{user_id}[?token={token}]`

Si el parámetro token contiene un token válido para el usuario user_id, devuelve un objeto de tipo *ProfileModel* con todos los datos. En otro caso, recibe el objeto con sólo los parámetros públicos del perfil.


`PUT /users/{user_id}`

Esquema contenido del put:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "token": { "type": "string" },
    "profile": { "type": "ProfileModel"}
  }
}
```
Si el token es válido para user_id, actualiza los campos actualizables del perfil y devuelve un código de éxito 200. De lo contrario devuelve un código de error.

`DELETE /users/{user_id}`

Esquema contenido delete:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "token": { "type": "string" }
  }
}
```
Si el token es válido para user_id, eliminar la cuenta. De lo contrario, error.

`GET /users/{user_id}/comments[?n={number}]`

Si el parámetro n contiene un número, se retornan como máximo los n últimos comentarios de user_id. En otro caso, recibe una cantidad por defecto. La respuesta sigue el esquema:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "user": { "type": "string" },
    "number": { "type": "integer" },
    "comments": {
      "type": "array",
      "items": { "type": "CommentModel" }
    }
  }
}
```

`GET /users/{user_id}/comments/{comment_id}`

Devuelve un objeto de tipo *CommentModel* o un código de error si no existe.

`DELETE /users/{user_id}/comments/{comment_id}`

Esquema contenido delete:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "user": {"type": "string" }
    "token": { "type": "string" }
  }
}
```
Si el token es válido para user_id, eliminar el comentario comment_id. De lo contrario, error.

`GET /users/{user_id}/comments/{comment_id}/likes[?n={number}]`

Si el parámetro n contiene un número, se retornan como máximo los n últimos likes al comentario de user_id. En otro caso, recibe una cantidad por defecto. La respuesta sigue el esquema:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "comment": { "type": "integer" },
    "number": { "type": "integer" },
    "comments": {
      "type": "array",
      "items": { "type": "LikeModel" }
    }
  }
}
```

`GET /users/{user_id}/comments/{comment_id}/likes/{like_id}`

Devuelve un objeto de tipo *LikeModel* o un código de error si no existe.

`GET /users/{user_id}/likes[?n={number}]`

Si el parámetro n contiene un número, se retornan como máximo los n últimos likes de user_id. En otro caso, recibe una cantidad por defecto. La respuesta sigue el esquema:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "user": { "type": "string" },
    "number": { "type": "integer" },
    "comments": {
      "type": "array",
      "items": { "type": "LikeModel" }
    }
  }
}
```

`GET /users/{user_id}/likes/{like_id}`

Devuelve un objeto de tipo *LikeModel* o un código de error si no existe.

`DELETE /users/{user_id}/likes/{like_id}`

Esquema contenido delete:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "user": {"type": "string" }
    "token": { "type": "string" }
  }
}
```
Si el token es válido para user_id, eliminar el like like_id. De lo contrario, error.like

## /products

`GET /products[?[n={number}][&keyword={keyword}][&category={category}][&min_price={min_price}][&max_price={max_price}]]`

Devuelve un objeto con esquema:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "params": {
      "type": "object",
      "properties": {
        "keyword": {
          "type": "array",
          "items": { "type": "string" }
        },
        "category": {
          "type": "array",
          "items": { "type": "string" }
        },
        "min_price": { "type": "integer" },
        "max_price": { "type": "integer" }
      }
    },
    "number": { "type": "integer" },
    "products": {
      "type": "array",
      "items": { "type": "ProductModel" }
    }
  }
}
```

`GET /products/{product_id}`
Devuelve un objeto con esquema *ProductModel*

`GET /products/{product_id}/comments[?n={number}]`

Si el parámetro n contiene un número, se retornan como máximo los n últimos comentarios de user_id. En otro caso, recibe una cantidad por defecto. La respuesta sigue el esquema:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "product": { "type": "integer" },
    "number": { "type": "integer" },
    "comments": {
      "type": "array",
      "items": { "type": "CommentModel" }
    }
  }
}
```

`POST /products/{product_id}/comments`

Esquema del contenido del post:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "user": {"type": "string" }
    "token": { "type": "string" },
    "comment": { "type": "CommentModel" }
  }
}
```
Si el token es válido para un usuario, pone un comentario de ese usuario en el producto. Devuelve un objeo de tipo *CommentModel*

`GET /products/{product_id}/comments/{comment_id}`

Devuelve un objeto de tipo *CommentModel* o un código de error si no existe.

`DELETE /products/{product_id}/comments/{comment_id}`

Esquema contenido delete:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "user": {"type": "string" }
    "token": { "type": "string" }
  }
}
```
Si el token es válido para user_id, eliminar el comentario comment_id. De lo contrario, error.

`GET /products/{product_id}/comments/{comment_id}/likes[?n={number}]`

Si el parámetro n contiene un número, se retornan como máximo los n últimos likes al comentario de user_id. En otro caso, recibe una cantidad por defecto. La respuesta sigue el esquema:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "comment": { "type": "integer" },
    "number": { "type": "integer" },
    "comments": {
      "type": "array",
      "items": { "type": "LikeModel" }
    }
  }
}
```

`POST /products/{product_id}/comments/{comment_id}/likes`

Esquema del contenido del post:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "token": { "type": "string" },
    "like": { "type": "LikeModel" }
  }
}
```
Si el token es válido para un usuario, pone un like de ese usuario en el comentario. Devuelve un objeto *LikeModel*

`GET /products/{product_id}/comments/{comment_id}/likes/{like_id}`

Devuelve un objeto de tipo *LikeModel* o un código de error si no existe.

`DELETE /products/{product_id}/comments/{comment_id}/likes/{like_id}`

Esquema contenido delete:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "user": {"type": "string" }
    "token": { "type": "string" }
  }
}
```
Si el token es válido para user_id, eliminar el like like_id. De lo contrario, error.

`GET /products/{product_id}/vendors[?n={number}]`

Si el parámetro n contiene un número, se retornan como máximo los n mejores precios. En otro caso, recibe una cantidad por defecto. La respuesta sigue el esquema:
```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "product": { "type": "integer" },
    "number": { "type": "integer" },
    "vendors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "vendor": { "type": "VendorModel" },
          "price": { "type": "number" },
        }
      }
    }
  }
}
```

/
	User
		Profile
			Comment
				Like
			Like
		Ranking
		Login
	Product
		Comment
			Like
		Vendor
	Category
	Vendor
	Search

## Git Flow

Para evitar problemas (corrupción de ficheros, conflictos), vamos a hacer uso de una convenci&oacute;n para el manejo de los repositorios Git, este es **GitFlow**

En todos los repositorios habr&aacute; 2 *branches* permanentes (y protegidos): 
   - **master**: &Uacute;ltima versi&oacute;n estable/semi-estable del repositorio, es el que contendr&aacute; las etiquetas de las diferentes versiones.
   - **develop**: Estado en desarrollo del sistema, puede contener c&oacute;digo con errores (no detectados), pero las *features* est&aacute;n implementadas completamente.
   
Adem&aacute;s, hay tres tipos de *branches* que son en los que realmente se escribe c&oacute;digo:
   - **feature**: Incluir nuevas funcionalidades, sale de **develop**, se har&aacute; *merge* a **develop**.
   - **release**: Preparar una nueva versi&oacute;n, normalmente cambiar el nombre de la versi&oacute;n en los ficheros de configuraci&oacute;n y poco m&aacute;s. Sale de **develop**, se har&aacute; *merge* a **develop y master**, adem&aacute;s se crear&aacute; una etiqueta en el *branch* **master**.
   - **hotfix**: Solucionar r&aacute;pidamente errores severos de la &uacute;ltima versi&oacute;n estable. Sale de **master** y se comporta igual que un *branch* tipo **release**
   
Como manejar todas las reglas es complejo, se va a usar el siguiente comando que automatiza todo el proceso (en el &uacute;ltimo enlace hay una lista con explicaciones m&aacute;s extensas).

 ```bash
 git flow [feature/release/hotfix] [start/finish/publish/pull] NAME
 ```

**TODOS** los *branches* de los tres tipos anteriores deber&aacute;n incluir en su nombre el tipo de *branch* que son, es decir, si se quiere a&ntilde;adir una nueva *feature* que a&ntilde;ada el login de los usuarios, el *branch* se llamar&aacute; **"feature/login"**.
No habr&aacute; ning&uacute;n *branch* con otro tipo de nombre, ni el nombre del autor del *branch*, ni el nombre de lo que contiene a secas...


Un par de enlaces para entenderlo mejor:
 - [Git Flow](https://jeffkreeftmeijer.com/git-flow/)
 - [Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)

Descripcion del proyecto:
Notas es una aplicación web simple pero funcional, esto permite que los usuarios puedan crear una nota. Si bien este proyecto fue desarrolado como parte del Curso de Ingeniería de Software, con el objetivo de aplicar nuestros conocimientos claves para realizar el despliegue en kubernetes. Aunque su función es sencilla, el enfoque que le hemos dado al proyecto nos ha servido para implemtar buenas practias en el desarrollo y despliegue. Utilizamos tecnologías como frontend, backend, base de datos, automatización, docker, kubernetes, deployment, service, ingress.

Instrucciones para el Despliegue 
Docker
Kubectl
Minikube
Paso sencillos para desplegar nuestro proyecto 
1) Construimos nuestra imagen en el frontend y backend, luego un push para subirlas y nos muestra en Docker hub
2) Creamos el contexto de DigitalOcen en funcion de kubernetes creamos uno nuevo y nos da el contexto, descargamos el dowlan config y genera el archivo que contiene el comando export para crear el contexto

   ![image](https://github.com/user-attachments/assets/706e51f7-4666-4935-a7ff-2f4aa9e9788f)

4) export KUBECONFIG="./k8s-1-32-2-do-1-lon1-1748225249345-kubeconfig.yaml":Este comando le indica a kubectl qué archivo de configuración usar para conectarse a un clúster específico de Kubernetes.

   ![image](https://github.com/user-attachments/assets/aeaf5334-27ae-41e7-bbcd-370615c982a0)

6) kubectl get certificates -n app: Este comando muestra los certificados TLS (como los de Let's Encrypt) que se han creado en el namespace app.

   ![image](https://github.com/user-attachments/assets/a9145142-6610-4b76-a512-57c47b54e564)

8) kubectl apply -k .: con este comando ejecutamos nuestro proyecto

9) kubectl get pods

   ![image](https://github.com/user-attachments/assets/b476ddf8-5c8a-4384-81dc-b3bd53ae3e2b)

10) kubectl get svc: Sirve para verifcar los estados

   ![image](https://github.com/user-attachments/assets/b2a5f4e2-547d-4158-a0a4-ff70d8fde55b)

   
12) Nos dirigimos al navegador y colocamos notas.umg.life, al iniciar por primera vez nos dirije a que nos logiemos, despues de eso ya podremos ingresar y nos aparecera la interfaz de notas.

   ![image](https://github.com/user-attachments/assets/e2a51ca1-fb63-45eb-b76b-8c834a9d6bbe)


   


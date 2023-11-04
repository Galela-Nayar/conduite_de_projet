# installer mongodb sur linux:
    - aller au repertoir conduite_de_projet la ou il y a les .deb
    - sudo dpkg -i mongodb-org-server_7.0.2_amd64.deb
    - sudo dpkg -i mongodb-compass_1.40.4_amd64.deb (ça instal l'interface de mongodb)

- sudo systemctl start mongod (ca lance la bdd)
- sudo systemctl status mongod (ca verifie si c'est bien active)
- sudo systemctl stop mongod (ca arrete la bdd)

#N'oublier pas de bien changer dans "src/main/resources/application.properties" le nom de ta bdd que tu peux creer avec compass.

# maintenant lancons notre programme maven -spring boot
    -mvn clean install
    -mvn install
    -mvn spring-boot:run




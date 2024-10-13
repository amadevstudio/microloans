# Microloan showcase

## Local development

### CMS part
```bash
cd cms
# docker-compose -f docker-compose.dev.yml up --watch
docker-compose -f docker-compose.dev.yml up db
npm run develop
```

### Frontend part
```bash
cd front
npm run codegen
npm run dev
```

## Server prepairing

As root
```bash
apt update
apt upgrade
apt install sudo

sudo apt install locales
sudo locale-gen en_US.UTF-8
sudo dpkg-reconfigure locales
```

Add to
```bash
vim .bashrc # If some locale users will presented in commands
```
Locales
```
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
```

## SSH keys

### On client

```bash
ssh-keygen # Generate ssh keys on your PC
```

### On server

```bash
myUser = "user-name"
useradd -s /bin/bash -d /home/$myUser -m -G sudo $myUser # Create your user
sudo passwd $myUser
su $myUser
cd ~
mkdir .ssh
echo '${YOUR_KEY_HERE, located in *.pub in .ssh of your PC}' > .ssh/authorized_keys
chmod 755 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
# Check ssh connection, then
sudo vim /etc/ssh/sshd_config # Set PasswordAuthentication no
```

## Dokploy

```bash
# ssh to server with your user
sudo su
curl -sSL https://dokploy.com/install.sh | sh

sudo usermod -aG docker $myUser
# Re-enter console
```

From your PC:
```bash
ssh -L 3000:localhost:3000 user:ip
```

Then open in your browser localhost:3000

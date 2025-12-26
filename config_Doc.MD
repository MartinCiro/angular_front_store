sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo 
sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin


# Crear configuración de Docker que funcione con nf_tables
sudo mkdir -p /etc/docker
cat <<EOF | sudo tee /etc/docker/daemon.json
{
  "iptables": false,
  "ip6tables": false,
  "userland-proxy": false,
  "experimental": true
}
EOF

# Reiniciar Docker
sudo systemctl daemon-reload
sudo systemctl restart docker

# Verificar estado
sudo systemctl status docker

sudo systemctl enable --now docker

sudo usermod -aG docker $USER
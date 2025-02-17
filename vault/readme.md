## Vault

<img src="https://developer.hashicorp.com/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dvault%26version%3Drefs%252Fheads%252Frelease%252F1.18.x%26asset%3Dwebsite%252Fpublic%252Fimg%252Flayers.png%26width%3D1506%26height%3D841&w=1920&q=75&dpl=dpl_Gpkis5daodif1XJUkruzJDBVBi2m" width=500 style="display: flex;">

</br>

1. Secrets Management Tool
2. Encryption is at rest and transit
3. Fine grained control
4. Dynamic Secrets
5. Architecture
    1. Core
    2. Secret Engine
        1. DB
        2. Key-Value
        3. PKI
        4. RabbitMQ
        5. AWS
        6. SSH
        7. K8s Secret Engine
    3. Storage Backend
    4. Authentication
        1. LDAP
        2. Kuberenetes Auth Method
        3. AWS

### Installation

1. Dev mode
    1. All secrets are in memory and not persisted
    2. Unseal and Toot token should be stored
2. Server Mode
    1. For production use

### Docker installation

```yaml
services:
  vault:
    image: hashicorp/vault
    container_name: vault
    environment:
      VAULT_ADDR: "http://0.0.0.0:8200"
      VAULT_API_ADDR: "http://0.0.0.0:8200"
      VAULT_ADDRESS: "http://0.0.0.0:8200"
      VAULT_UI: true
      # VAULT_TOKEN:
    ports:
      - "8200:8200"
      - "8201:8201"
    restart: always
    volumes:
      - ./data:/vault/data/:rw
      - ./config:/vault/config/:rw
    cap_add:
      - IPC_LOCK
    entrypoint: vault server -config /vault/config/config.hcl
```

1. Exec into contianer and then do `vault operator init` copy the seals and store safely
2. Install Vault CLI in local manchine
3. Login through CLI `VAULT_ADDR=<addr> vault login`

### Seal/Unseal

1. When a Vault server is started, it starts in a sealed state. In this state, Vault is configured to know where and how to access the physical storage, but doesn't know how to decrypt any of it.
2. Unsealing is the process of obtaining the plaintext root key necessary to read the decryption key to decrypt the data, allowing access to the Vault.
3. Prior to unsealing, almost no operations are possible with Vault. For example authentication, managing the mount tables, etc. are all not possible. The only possible operations are to unseal the Vault and check the status of the seal.

### Why?

1. The data stored by Vault is encrypted. Vault needs the encryption key in order to decrypt the data. The encryption key is also stored with the data (in the keyring), but encrypted with another encryption key known as the root key.
2. Therefore, to decrypt the data, Vault must decrypt the encryption key which requires the root key. Unsealing is the process of getting access to this root key. The root key is stored alongside all other Vault data, but is encrypted by yet another mechanism: the unseal key.
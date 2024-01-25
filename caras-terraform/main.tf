terraform {
    required_providers {
        azurerm = {
            source = "hashicorp/azurerm"
        }
    }
}

provider "azurerm" {
    features {}
}

resource "azurerm_resource_group" "testResourceGroup" {
    name = "testResourceGroup"
    location = "East US"
}

resource "azurerm_kubernetes_cluster" "testAKSCluster" {
    name = "testAKSCluster"
    location = azurerm_resource_group.testResourceGroup.location
    resource_group_name = azurerm_resource_group.testResourceGroup.name
    dns_prefix = "test-aks"

    default_node_pool {
        name = "default"
        node_count = 1
        vm_size = "Standard_DS2_v2"
    }
    
    service_principal {
        client_id = "fcab5924-0692-46e5-a606-d9c0c98d84da"
        client_secret = "39h8Q~LF-AIjapZf3XHnXZhBtUfsf4QSvoY0wa9g"
    }
}
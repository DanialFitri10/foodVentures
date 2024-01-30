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

resource "azurerm_resource_group" "foodVenturesDanial" {
    name = "foodVenturesDanial"
    location = "East US"
}

resource "azurerm_kubernetes_cluster" "DanialDockerCluster" {
    name = "DanialDockerCluster"
    location = azurerm_resource_group.foodVenturesDanial.location
    resource_group_name = azurerm_resource_group.foodVenturesDanial.name
    dns_prefix = "rms-aks"

    default_node_pool {
        name = "default"
        node_count = 1
        vm_size = "Standard_DS2_v2"
    }
    
    service_principal {
        client_id = "730f0eb5-5dea-4042-8afd-e8e60e3e9aa0"
        client_secret = "9JI8Q~aRTz-Xp24IAjDisPaqiMLXCQcyu0DXvcpN"
    }
}
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
        client_id = "9b40cd75-f9e6-4c82-b01e-35e3a1aaff45"
        client_secret = "55y8Q~4Ps01smVrcCtOmDlDRYP7LiSOWeMeQ5b8P"
    }
}
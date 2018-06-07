# PropType

Permet de définir la liste des attributs qu'un composant peut recevoir.
Reprend le fonctionnement d'un contrat d'interface.

#Thunk

Permet de mettre en place un middleWare.
Execute la fonction passé au Thunk qui aura pour signature :

''' bash
    (dispatch) => {
        if (true) {
            dispatch(SUCCESS)
        }
        ...
    }
'''

# Epics

Permet de gérer les effets de bords.
Il est possible de dispatch des actions d'Epics ou de Reducer
L'ensemble de ces actions doivent être implémenté dans un ducks
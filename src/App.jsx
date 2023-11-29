import React from 'react'

import './App.scss'

import cocktailsData from './data/cocktails.json'
import { Box, Text, Flex, Divider, Checkbox, Heading, Grid, GridItem } from '@chakra-ui/react'

import { LiaCocktailSolid } from "react-icons/lia";


const App = () => {
  const { cocktails, ingredients } = cocktailsData

  const getInitialSelection = () => {
    const initialSelectionState = {}	
    Object.keys(ingredients).forEach(ingredient => {
      initialSelectionState[ingredient] = null
    })

    return initialSelectionState
  }

  const [selection, setSelection] = React.useState(getInitialSelection())

  const handleIngredientCheck = (ingredient, e) => {
    
    const currentSelection = selection[ingredient]
    let newSelectionState

    if (currentSelection === null) {
      newSelectionState = "selected"
    } else if (currentSelection === "selected") {
      newSelectionState = "removed"
    } else if (currentSelection === "removed") {
      newSelectionState = null
    }

    return setSelection({
      ...selection,
      [ingredient]: newSelectionState
    })
  }

  const isCocktailAvailable = (cocktailName) => {
    const cocktail = cocktails[cocktailName]

    const cocktailIngredients = cocktail.ingredients

    const selectedIngredientes = Object
      .entries(selection)
      .filter(([_, value]) => value === "selected")
      .map(([key, _]) => key)

    const areIngredientsSelected = Object.keys(cocktailIngredients).every(cocktailIngredient => {
      const ingredientSelection = selection[cocktailIngredient]
      
      if (ingredientSelection === "removed") {
        return false
      }

      return true
    })

    const areExtraIngredientesSelected = selectedIngredientes.some(selectedIngredientes => {
      return !cocktailIngredients[selectedIngredientes]
    } )

    console.log(areExtraIngredientesSelected)

    return areIngredientsSelected && !areExtraIngredientesSelected
  }

  return (
    <Box className='book'>
      <Box className='navigation'>
        <div className='navigation--container'>
          <div className='navigation--element' onClick="setPage(evidencePage)"> Bar </div>
          <div className='navigation--element' onClick="setPage(ghostPageOffset)"> Ghosts</div>
        </div>
      </Box>
      <Box className='page'>
        <Box className='evidence-container'>
          <Text as={'h2'}> 
            Ingredients 
          </Text>
          <Divider orientation='horizontal' style={{ borderBlockColor: "#242424" }} />
          <Box m={[4, 2]}>  
            <Grid
              h='200px'
              templateRows='repeat(5, 1fr)'
              templateColumns='repeat(3, 1fr)'
              gap={4}
              mt={8}
            >  
              {Object.keys(ingredients).map((ingredient, index) => {
                return (
                  <GridItem key={index} colSpan={1}>
                    <Flex>
                      <Checkbox
                        isChecked={selection[ingredient] === "selected"}
                        onChange={e => handleIngredientCheck(ingredient, e)}
                        size='lg'
                        className={`
                          ingredient-checkbox
                          ingredient-checkbox--${selection[ingredient] === "selected" ? "selected" : ""}
                          ingredient-checkbox--${selection[ingredient] === "removed" ? "removed" : ""}
                        `}
                        colorScheme='teal'
                      >
                        {ingredient} 
                      </Checkbox>
                  </Flex>
                  </GridItem> 
                  )
              })}
            </Grid>
          </Box>
        </Box>
        <Box className="cocktails-container">
          <Box className='cocktails-container--header'>
            <Box>
              <LiaCocktailSolid />
            </Box>  
            <Text as={'h2'}> 
              Cocktails 
            </Text>
          </Box>
        <Divider orientation='horizontal' style={{ borderBlockColor: "#242424" }} />
        <Grid
          templateRows='repeat(3, 1fr)'
          templateColumns='repeat(3, 1fr)'
          gap={4}
          mt={8}
        >  
          {Object.keys(cocktails).map((cocktail, index) => {
            return (
              <GridItem key={index} colSpan={1} >
                <Text className={`
                  cocktail-name
                  cocktail-name--${isCocktailAvailable(cocktail) ? "available" : ""}
                `}>
                  {cocktail}
                </Text>
              </GridItem> 
              )
          })}
            </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default App

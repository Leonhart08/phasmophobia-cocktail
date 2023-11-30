import React from 'react'

import './App.scss'

import cocktailsData from './data/cocktails.json'
import { Box, Text, Flex, Divider, Checkbox, Heading, Grid, GridItem, Img } from '@chakra-ui/react'

import { LiaCocktailSolid, LiaLemon  } from "react-icons/lia";


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

    return areIngredientsSelected && !areExtraIngredientesSelected
  }
  const [page, setPage] = React.useState(0)

  const [catIndex] = React.useState(Math.floor(Math.random() * 6) + 1)

  return (  
    <Box className='book'>
      <Box className='navigation'>
        <div className='navigation--container'>
          <div className='navigation--element' onClick={() => setPage(0)}> Bar </div>
          <div className='navigation--element' onClick={() => setPage(1)}> Cocktails </div>
          <div className='navigation--element' onClick={() => setPage(2)}> Ghosts </div>
        </div>
      </Box>
      {page === 0 && (
        <Box className='page page-1'>
          <Box className='evidence-container'>
            <Box className='cocktails-container--header'>
              <Box>
                <LiaLemon />
              </Box>  
              <Text as={'h2'}> 
                Ingredients 
              </Text>
            </Box>
            <Divider orientation='horizontal' borderWidth={'1px'} borderColor="black" />
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
          <Divider orientation='horizontal' borderWidth={'1px'} borderColor="black" />
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
      )}
      {page === 1 && (
      <Box className='page page-2'>
        <Box className='cocktails-list-container'>
          <Text as={'h2'}> 
            Cocktails 
          </Text>
          <Box className='cocktails-list'>
            {Object.entries(cocktails).map(([key, value]) => {
              return (
                <Box key={`coktail-${key.toLowerCase()}`} className='cocktails-list-item'>
                  <Box style={{ display: 'flex', alignItems: 'center'}}>
                  <Box pb={'6px'} mr={'4px'}>
                    <LiaCocktailSolid size={'18px'}/>
                  </Box>   
                  <Box className='cocktails-list-item--title'> {key} </Box>
                  </Box>
                  <Divider orientation='horizontal' borderWidth={'1px'} borderColor="black" />
                  <Box className='cocktails-list-item--ingredients'> 
                    {Object.entries(value.ingredients).map(([ingredientName, ingredientAmount]) => {
                      return ( 
                        <Box key={`ingredient-${ingredientName.toLowerCase()}`} className='cocktails-list-item--ingredient'> 
                          {ingredientName} - {ingredientAmount} 
                        </Box>)
                      }  
                    )} 
                  </Box>
                </Box>
              )
            })
          } 
          </Box>
        </Box>
      </Box>
      )}
      {page === 2 && (
      <Box className='page page-2'>
        <Box className='ghost-container'>
          <Box className='ghost-borders'> 
            <Img src={`cat_${catIndex}.jpg`} />
          </Box>
        </Box>
      </Box>
      )}
      
      { page !== 1 && <Box className='flip' /> }

    </Box>
  )
}

export default App

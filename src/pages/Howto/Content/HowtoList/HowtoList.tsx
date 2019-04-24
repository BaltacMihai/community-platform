import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Box } from 'rebass'
import { Flex as FlexGrid } from '@rebass/grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Text from 'src/components/Text'
import Heading from 'src/components/Heading'
import styled from 'styled-components'

import { Button } from 'src/components/Button'
import { IHowto } from 'src/models/howto.models'

interface IProps {
  allHowtos: IHowto[]
}

const CardImage = styled(Image)`
  height: 230px;
  object-fit: cover;
  width: 100%;
`
const CardInfosContainer = styled(Box)`
  height: 170px;
`

export class HowtoList extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const { allHowtos } = this.props
    return (
      <>
        <Link to={'/how-to/create'}>
          <Button variant="outline" mx={'auto'} my={3} icon={'add'}>
            create
          </Button>
        </Link>
        <React.Fragment>
          <div>
            {allHowtos.length === 0 ? (
              <LinearProgress />
            ) : (
              <FlexGrid flexWrap={'wrap'} justifyContent={'center'}>
                {allHowtos.map((howto: IHowto, index: number) => (
                  <Box m={2}>
                    <Card borderRadius={1} width={[380]} bg={'white'}>
                      <CardImage
                        src={
                          howto.cover_image
                            ? howto.cover_image.downloadUrl
                            : howto.cover_image_url
                        }
                      />
                      <CardInfosContainer px={2}>
                        <Link to={`/how-to/${encodeURIComponent(howto.slug)}`}>
                          <Heading small bold>
                            {howto.tutorial_title}
                          </Heading>
                        </Link>
                        <Text fontSize={1} my={2}>
                          by <b>{howto.workspace_name}</b>
                        </Text>
                      </CardInfosContainer>
                    </Card>
                  </Box>
                ))}
              </FlexGrid>
            )}
          </div>
          {allHowtos.length > 15 ? (
            <Link to={'/how-to/create'}>
              <Button mx={'auto'} my={50} icon={'add'}>
                create how-to
              </Button>
            </Link>
          ) : null}
        </React.Fragment>
      </>
    )
  }
}

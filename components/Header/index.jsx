import React, { useState, useEffect, useContext } from 'react'
import {
  Navbar,
  Link,
  Text,
  Avatar,
  Dropdown,
  useTheme,
  Grid,
  Button
} from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { ContainerAddress } from '../ContainerAddress'
import { Context } from '../../context'

function Header () {
  const { mySession } = useContext(Context)
  const { isDark } = useTheme()
  const collapseItems = ['Profile', 'Activity', 'My Settings', 'Log Out']
  const [connect, setConnect] = useState(false)
  const [notConnect, setNotConnect] = useState(false)
  useEffect(() => {
    if (!mySession) {
      setConnect(false)
      setNotConnect(true)
    } else if (mySession) {
      setConnect(true)
      setNotConnect(false)
    }
  }, [mySession])
  const [stateWidth, setWindowWidth] = useState(0)
  const [viewTablet, setViewTablet] = useState(false)
  const updateDimensions = () => {
    const width = window.innerWidth
    setWindowWidth(width)
    if (width <= 768) {
      setViewTablet(false)
    } else if (width >= 768) {
      setViewTablet(true)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
  })
  return (
    <>
      <Navbar isBordered={isDark} variant='sticky'>
        <Navbar.Toggle showIn='xs' />
        <Navbar.Brand
          css={{
            '@xs': {
              w: '12%'
            }
          }}
        >
          <Image
            src='/img/logo.png'
            alt='Logotipo de Black Bears'
            width={180}
            height={50}
          />
        </Navbar.Brand>
        {connect && (
          <Navbar.Content
            css={{
              '@xs': {
                w: '12%',
                jc: 'flex-end'
              }
            }}
          >
            {viewTablet && <ContainerAddress />}
            <Dropdown placement='bottom-right'>
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as='button'
                    color='secondary'
                    size='md'
                    src='/img/Avatar.webp'
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label='User menu actions'
                color='secondary'
                onAction={actionKey => console.log({ actionKey })}
              >
                <Dropdown.Item key='profile' css={{ height: '$18' }}>
                  <Text b color='inherit' css={{ d: 'flex' }}>
                    Signed in as
                  </Text>
                  <Text b color='inherit' css={{ d: 'flex' }}>
                    zoey@example.com
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key='settings' withDivider>
                  My Settings
                </Dropdown.Item>
                <Dropdown.Item key='team_settings'>Activity</Dropdown.Item>
                <Dropdown.Item key='help_and_feedback' withDivider>
                  Help & Feedback
                </Dropdown.Item>
                <Dropdown.Item key='logout' withDivider color='error'>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {viewTablet && (
              <Grid>
                <Button
                  bordered
                  color='primary'
                  auto
                  ghost
                  onClick={() => signOut({ redirect: '/signin' })}
                >
                  Disconnect
                </Button>
              </Grid>
            )}
          </Navbar.Content>
        )}
        {notConnect && (
          <Navbar.Content
            css={{
              '@xs': {
                w: '12%',
                jc: 'flex-end'
              }
            }}
          >
            <Grid>
              <Button bordered color='primary' auto ghost>
                Connect
              </Button>
            </Grid>
          </Navbar.Content>
        )}
        <Navbar.Collapse disableAnimation>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor='secondary'
              css={{
                color: index === collapseItems.length - 1 ? '$error' : ''
              }}
            >
              <Link
                color='inherit'
                css={{
                  minWidth: '100%'
                }}
                href='#'
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export { Header }

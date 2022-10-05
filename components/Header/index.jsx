import React, { useState, useEffect, useContext } from 'react'
import {
  Navbar,
  Text,
  Avatar,
  Dropdown,
  useTheme,
  Grid,
  Button
} from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { ContainerAddress } from '../ContainerAddress'
import { Context } from '../../context'
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite
} from 'wagmi'
import {
  daiAbi,
  betContractAbi,
  daiContractAddress,
  superBetContractAddress,

} from '../../constants'

function Header() {
  const { mySession, viewTablet } = useContext(Context)
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


  const faucet = usePrepareContractWrite({
    chainId: 0x5,
    addressOrName: daiContractAddress,
    contractInterface: daiAbi,
    functionName: 'faucet',
    args: [
      "100000000000000000000"
    ]
  })
  const _faucet = useContractWrite(faucet.config)

  //add token to metamask
  const tokenAddress = "0x29282139fD1A88ccAED6d3bb7f547192144C0f95";
  const tokenSymbol = "DAI";
  const tokenDecimals = 18;

  //Check if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };


  async function addTokenToMetamask(){
    if (!isMetaMaskInstalled()) {
      console.log("MetaMask is not installed!");
      return;
    }
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
          },
        },
      });
      if (wasAdded) {
        console.log("Token Sucessfully Added!");
      } else {
        console.log("Token Wasnt Added!");
      }
    } catch (error) {
      console.log(error);
    }
  }


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
                onAction={actionKey => {
                  if (actionKey === 'logout') {
                    signOut({ redirect: '/signin' })
                  }
                }}
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

            <Button
              bordered
              color='primary'
              auto
              ghost
              onClick={() => {
                addTokenToMetamask()
              }
              }
            >
              Add token to metamask
            </Button>

            <Button
              bordered
              color='primary'
              auto
              ghost
              onClick={() => {
                _faucet.write()
              }
              }
            >
              Get 100 DAI
            </Button>
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

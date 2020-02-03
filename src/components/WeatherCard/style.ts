
import styled from 'styled-components'

const dropletSize = 15

export const Droplet = styled.div`
    display: inline-block;

    width: ${dropletSize}px;
    height: ${dropletSize}px;

    border-top-left-radius: 0;
    border-top-right-radius: 75px;
    border-bottom-right-radius: 75px;
    border-bottom-left-radius: 75px;

    border: 1px solid rgba(0, 0, 0, .1);
    transform: rotate(45deg);
    background: lightskyblue;
`
export const Card = styled.div`
  min-width: 320px;
  max-width: 640px;
`
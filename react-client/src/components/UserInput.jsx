import React from 'react'
import styled from 'styled-components'
import ReactSlider from 'react-slider'

const Wrapper = styled.div `
  margin: 10px
`
const Name = styled.div `
font-family: Verdana;
font-size: 20px
`
const Input = styled.input `
  margin: 2px 20px 2px 5px;
  height: 24px
`
const StyledSlider = styled(ReactSlider)`
    width: 300px;
    height: 25px;
    margin: 5px auto;
`;
const Track = styled.div `
  border: 1px blue solid
`
const Button = styled.button `
  font-family: sans-serif;
  background-color: #64b6ac;
  font-size: 24px;
  color: #fff;
  width: 312px;
  border: groove;
  border-radius: 2px;
  font-weight: 500;
  padding: .5rem 1rem;
  margin: 5px auto 10px auto;
  cursor: pointer;
  grid-column: 1 / span 2;
  &: active {
    outline: none
  };
  &:focus {
    outline: none !important;
    }
`
const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 40px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 10px;
    cursor: grab;
    &: active {
    outline: none
    };
    &:focus {
      outline: none !important;
      }
`;

class UserInput extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      radius: 0,
      price: '1,2,3,4'
    }
  }

  handleSlider(value) {
    const price = []
    for(let i = value[0]; i <= value[1]; i++) {
      price.push(i)
    }
    this.setState({
      price: price.join(',')
    })
  }

  handleSearch (e) {
    this.setState({
      search: e.target.value
    })
  }

  handleRadius (e) {
    let radius = e.target.value
    if (radius < 1) {
      radius = 1
    } else if (radius > 24) {
      radius = 24
    }
    this.setState({ radius: radius * 1609})
  }

  Search() {
    this.props.searchInput(this.state)
  }

  render(){
    return(
      <Wrapper>
        <Name>
          Filter
          <Input onChange={this.handleSearch.bind(this)}></Input>
          Radius (miles)
          <Input type='number' min='1' max='25' onChange={this.handleRadius.bind(this)}></Input>
        </Name>
        <StyledSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          defaultValue={[1, 4]}
          min={1}
          max={4}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={state => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => <StyledThumb {...props}>{('$').repeat(state.valueNow)}</StyledThumb>}
          renderTrack={(props, state) => <Track {...props} />}
          pearling
          onChange = {(value)=> {this.handleSlider(value)}}
      />
      <Button onClick={this.Search.bind(this)}>Build Deck</Button>
      </Wrapper>
    )
  }
}

export default UserInput
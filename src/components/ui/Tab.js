import React from 'react'
const Tab = (props) =>{
  function handleSearch (index) {
    props.setActivatedTab({activeTab:index});
  }

  return (
    <div className='tab'>
      {
        props.Tab.map((tab, index) => {
          if (index === props.activatedTab) return (
            <div className='item-tab active' key={index}>{tab.title}</div>
          );
          return (<div className='item-tab' onClick={() => { handleSearch(index, tab.id); }} key={index} style={{cursor: 'pointer'}}>{tab.title}</div>);

        })
      }
    </div>
  )
}

export default Tab;
import React from 'react'

function Withdraw() {
  return (
    <div className="mb-4">
        <h3 className="mt-2 mb-2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>WithDraw</h3>
        <div className='row'>
            <div className='col-md-6 col-xs-12' >
                <div className='col-md-12' style={{display:"flex",justifyContent:"space-between",padding:"5px"}} >
                    <label htmlFor='name' style={{fontWeight:"400"}} >Name *</label>
                    <input type="text" name="title" style={{padding:"5px"}} />
                </div>
                <div className='col-md-12' style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
                    <label htmlFor='category' style={{fontWeight:"400"}}>Category *</label>
                    <input type="text" name="category" style={{padding:"5px"}} />
                </div>
                <div className='col-md-12' style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
                    <label htmlFor='colors' style={{fontWeight:"400"}}>Colors (such as yellow,red)</label>
                    <input type='text' name='colors' style={{padding:"5px"}}/>
                </div>
                <div className='col-md-12' style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
                    <label htmlFor='sizes' style={{fontWeight:"400"}}>Sizes (such as small,large)</label>
                    <input type='text' name='sizes' style={{padding:"5px"}}/>
                </div>
            </div>
            <div className='col-md-6 col-xs-12'>
                <div className='col-md-12' style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
                    <label htmlFor='lowPrice' style={{fontWeight:"400"}}>Lowest Price</label>
                    <input type='text' name='lowPrice' style={{padding:"5px"}} />
                </div>
                <div className='col-md-12' style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
                    <label htmlFor='prices' style={{fontWeight:"400"}}>Price</label>
                    <input type='text' name='prices' style={{padding:"5px"}} />
                </div>
                <div className='col-md-12' style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
                    <label htmlFor='tags' style={{fontWeight:"400"}}>Tag</label>
                    <input type='text' name='tags' style={{padding:"5px"}} />
                </div>
                <div className='col-md-12' style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
                <label htmlFor='tags' style={{fontWeight:"400"}}>Image</label>
                <input type='file' name='tags' style={{padding:"5px"}} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Withdraw
<div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
  <Paper className={classes.paper} elevation={6}>
    <ToastContainer />
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h3" style={{ backgroundColor: "" }}>
        Adding Product
      </Typography>
      <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select
          required
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={productData.category}
          label="Category"
          onChange={(e) => setProductData({ ...productData, category: e.target.value })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories?.map((cat, i) => {
            return (
              <MenuItem value={cat} key={i}>
                {cat}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
        <Select
          required
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={productData.country}
          label="Country"
          onChange={(e) => setProductData({ ...productData, country: e.target.value })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {countries?.map((count, i) => {
            return (
              <MenuItem value={count} key={i}>
                {count}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Company</InputLabel>
        <Select
          required
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={productData.company}
          label="Company"
          onChange={(e) => setProductData({ ...productData, company: e.target.value })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {choosenCountry}
          {companies?.map((comp, i) => {
            return (
              <MenuItem value={comp} key={i}>
                {comp}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Brand</InputLabel>
        <Select
          required
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={productData.brand}
          label="Brand"
          onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {brands?.map((brand, i) => {
            return (
              <MenuItem value={brand} key={i}>
                {brand}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Capacity</InputLabel>
        <Select
          required
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={productData.capacity}
          label="Capacity"
          onChange={(e) => setProductData({ ...productData, capacity: e.target.value })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {capacities?.map((cap, i) => {
            return (
              <MenuItem value={cap} key={i}>
                {cap}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <TextField
        name="code"
        variant="outlined"
        label="Product Code"
        fullWidth
        value={productData.code}
        onChange={(e) => setProductData({ ...productData, code: e.target.value })}
      />
      <TextField
        name="netWeight"
        variant="outlined"
        label="Net Weight"
        fullWidth
        value={productData.netWeight}
        onChange={(e) => {
          if (e.target.value.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
            setProductData({ ...productData, netWeight: e.target.value });
        }}
      />
      <TextField
        name="grossWeight"
        variant="outlined"
        label="Gross Weight"
        fullWidth
        value={productData.grossWeight}
        onChange={(e) => {
          if (e.target.value === "" || regex.test(e.target.value))
            setProductData({ ...productData, grossWeight: e.target.value });
        }}
      />
      <TextField
        name="paletSize"
        variant="outlined"
        label="Palet Size"
        fullWidth
        value={productData.palatSize}
        onChange={(e) => {
          if (e.target.value === "" || regex.test(e.target.value))
            setProductData({ ...productData, palatSize: e.target.value });
        }}
      />
      <TextField
        name="price"
        variant="outlined"
        label="Net Price"
        fullWidth
        value={productData.price}
        onChange={(e) => {
          if (e.target.value === "" || regex.test(e.target.value))
            setProductData({ ...productData, price: e.target.value });
        }}
      />
      <TextField
        name="freezonePrice"
        variant="outlined"
        label="Freezone Price"
        fullWidth
        value={productData.freezonePrice}
        onChange={(e) => {
          if (e.target.value === "" || regex.test(e.target.value))
            setProductData({ ...productData, freezonePrice: e.target.value });
        }}
      />
      <TextField
        name="LocalPrice"
        variant="outlined"
        label="Local Price"
        fullWidth
        value={productData.LocalPrice}
        onChange={(e) => {
          if (e.target.value === "" || regex.test(e.target.value))
            setProductData({ ...productData, LocalPrice: e.target.value });
        }}
      />

      <TextField
        name="description"
        variant="outlined"
        label="DESECRIPTION"
        fullWidth
        multiline
        minRows={4}
        value={productData.description}
        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
      />

      <div className={classes.fileInput}>
        <input
          style={{ color: "red", width: "25%", height: "30px" }}
          type="file"
          name="img"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setIsUploading(true);
          }}
        />
        <button
          type="button"
          style={{
            color: "white",
            width: "12%",
            backgroundColor: "red",
            height: "30px",
            marginLeft: "20px",
            borderRadius: "5%",
          }}
          onClick={handleUpload}
        >
          Upload image
        </button>
      </div>
      {/* <div className={classes.fileInput} >
                    <form onSubmit={handeleDatasheetSubmit}> 
                            <input  style={{ color: "red" ,width :"25%" ,height :"30px" }} type="file" />
                            <button  style={{ color: "white" ,width :"12%",backgroundColor : "red" ,height :"30px" ,marginLeft : "20px", borderRadius : "5%" }} className="btn btn-primary" type="submit">Upload Datasheet</button>
                    </form>
            </div>
       */}
      <Button
        className={classes.buttonSubmit}
        disabled={isUploading}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
      >
        Submit
      </Button>
      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
        Clear
      </Button>
    </form>
  </Paper>
</div>;

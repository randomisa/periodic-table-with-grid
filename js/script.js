

/*
https://github.com/Bowserinator/Periodic-Table-JSON/blob/master/PeriodicTableJSON.json#L184
https://en.wikipedia.org/wiki/Periodic_table
*/

import periodicTable from './elements';
import { strict } from 'assert';

/******************************************************************
// 1. Global variables
******************************************************************/
// other variables

let boxShadowBtn = "grey 0px 0px 2px 4px";

// for matter_categories
let gasMatterArray = [];
let solidMatterArray = [];
let liquidMatterArray = [];
let notNaturalMatterArray = [];

// for matter_types
let alkaliMetalArray = [];
let alkalineEarthMetalArray = [];
let lanthanideArray = [];
let actinideArray = [];
let transitionMetalArray = [];
let metalloidsArray = [];
let postTransitionMetalArray = [];
let reactiveNonmetalArray = [];
let nobleGasArray = [];
let unknownMatterArray = [];

let metalHeadlineMatterTypesBtn = document.querySelector(".metal_headline");
let nonMetalMatterTypesBtn = document.querySelector("nonmetal_headline");

function MatterTypesBtnProperties(colorBackground, colorHovered, colorFont, noSelection, elementsClassName, elementsIdArray) {
    this.colorBackground = colorBackground;
    this.colorHovered = colorHovered;
    this.colorFont = colorFont;
    this.noSelection = noSelection;
    this.elementsClassName = elementsClassName;
    this.elementBtn = document.querySelector(elementsClassName);
    this.elementsIdArray = elementsIdArray;
};

const matterTypes = {
    alkaliMetal: new MatterTypesBtnProperties("rgb(197, 212, 255)", "rgb(160, 185, 255)", "black", "green", ".alkali-metal", alkaliMetalArray),
    alkalineEarthMetal: new MatterTypesBtnProperties("rgb(255, 148, 148)", "rgb(230, 127, 127)", "black", "green", ".alkaline-earth-metal", alkalineEarthMetalArray),
    lanthanide: new MatterTypesBtnProperties("#c3ffc7", "rgb(167, 226, 171)", "black", "green", ".lanthanide", lanthanideArray),
    actinide: new MatterTypesBtnProperties("rgb(84, 181, 91)", "rgb(63, 136, 68)", "black", "green", ".actinide", actinideArray),
    transitionMetal: new MatterTypesBtnProperties("rgb(255, 202, 164)", "rgb(218, 170, 135)", "black", "green", ".transition-metal", transitionMetalArray),
    postTransitionMetal: new MatterTypesBtnProperties("#cddc39", "rgb(180, 193, 53)", "black", "green", ".post-transition-metal", postTransitionMetalArray),
    metalloids: new MatterTypesBtnProperties("#c0a5f1", "rgb(144, 125, 179)", "black", "green", ".metalloids", metalloidsArray),
    reactiveNonmetal: new MatterTypesBtnProperties("rgb(253, 255, 156)", "rgb(239, 241, 158)", "black", "green", ".reactive-nonmetal", reactiveNonmetalArray),
    nobleGas: new MatterTypesBtnProperties("rgb(182, 238, 255)", "rgb(158, 202, 216)", "black", "green", ".noble-gas", nobleGasArray),
    unknownMatter: new MatterTypesBtnProperties("#fef3ff", "rgb(236, 226, 236)", "black", "green", ".unknown-properties", unknownMatterArray)
};

const matterTypesArray = Object.values(matterTypes);



function matterCategoryBtnProperties(colorBackground, colorHovered, colorFont, noSelection, elementsClassName, elementsIdArray) {
    this.colorBackground = colorBackground;
    this.colorHovered = colorHovered;
    this.colorFont = colorFont;
    this.noSelection = noSelection;
    this.elementsClassName = elementsClassName;
    this.elementBtn = document.querySelector(elementsClassName);
    this.elementsIdArray = elementsIdArray;
};

const matterCategories = {
    gas: new matterCategoryBtnProperties("rgb(177, 0, 0)", "rgb(255, 65, 65)", "white", "violet", ".gas", gasMatterArray),
    solid: new matterCategoryBtnProperties("#010101", "rgb(74, 74, 74)", "white", "violet", ".solid", solidMatterArray),
    liquid: new matterCategoryBtnProperties("#288300", "rgb(78, 218, 16)", "white", "violet", ".liquid", liquidMatterArray),
    unknown: new matterCategoryBtnProperties("#868686", "rgb(185, 185, 185)", "white", "violet", ".unknown", notNaturalMatterArray),
};

const matterCategoriesArray = Object.values(matterCategories);
console.log(matterCategoriesArray);


/******************************************************************
// 2. Make Row
******************************************************************/
rowGenerator();

/******************************************************************
// 3. Make Column
******************************************************************/
columnGenerator();

/******************************************************************
// 4. PeriodicTable_Boxes
******************************************************************/

let testSearchCategories = [];
console.log(testSearchCategories);

elementBoxesGenerator();

//add color to matter_types
elementBoxesColorConfiguration();

//add color to each element number based on their matter type (comes from states of matter)
matterCategorizationConfigurator();


/******************************************************************
// 5. PeriodicTable_Presenter
// ******************************************************************/
togglePresenterVisibility(false);
periodicTablePresenterGenerator();

// matterTypesBtn.forEach(matterTypesBtnConfigurator => {
//     matterTypesBtnConfigurator.elementsIdArray.forEach(elementsQuerySelector => {
//         elementsQuerySelector.style.backgroundColor = matterTypesBtnConfigurator.colorBackground;
//     });
// });

function togglePresenterVisibility(presenterVisibility) {
    document.querySelector(".presenter").style.display = presenterVisibility ? 'block' : 'none';
}

/******************************************************************
// 5. Matter Types Buttons
******************************************************************/

matterTypesBtnConfiguration();

console.log(matterTypesArray);

/******************************************************************
// 6. Matter Categorization Buttons
******************************************************************/

matterCategoriesBtnConfiguration();




/*_____________________________________________________________*/


function rowGenerator() {
    let rowGroupNumber = 0;
    let rowGroupYPos = 1;
    let rowGroupXPos = 1;

    for (let i = 0; i < 18; i++) {
            
        const domElementRow = document.createElement("div");

        // add number HTML
        let rowGroupNumberHTML = rowGroupNumber += 1;

        domElementRow.innerHTML = rowGroupNumberHTML;

        // add class
        domElementRow.classList.add("middle_pos");

        // add gridArea
        domElementRow.style.gridArea = rowGroupYPos + " / " + (rowGroupXPos += 1)/* + " / span 1 / span 1"*/;

        document.querySelector('.row_group').appendChild(domElementRow);
    };
};


function columnGenerator() {
    let columnPeriodNumber = 0;
    let columnPeriodYPos = 1;
    let columnPeriodXPos = 1;

    for (let i = 0; i < 7; i++) {
            
        const domElementColumn = document.createElement("div");

        // add number HTML
        let columnPeriodNumberHTML = columnPeriodNumber += 1;

        domElementColumn.innerHTML = columnPeriodNumberHTML;

        // add class
        domElementColumn.classList.add("middle_pos");

        // add gridArea
        domElementColumn.style.gridArea = (columnPeriodYPos += 1) + " / " + columnPeriodXPos/* + " / span 1 / span 1"*/;

        document.querySelector('.column_period').appendChild(domElementColumn);
    };
};


function elementBoxesGenerator() {
    // generate div
    periodicTable.elements.forEach((periodicEl) => {
        
        testSearchCategories.push(periodicEl.category);

        const domElement = document.createElement('div');

        // Add id="id"
        domElement.id = periodicEl.symbol.toLowerCase();

        // Add class="el_box" for layout
        domElement.classList.add("el_box");
        
        // Set position x / y
        periodicEl.ypos = periodicEl.ypos + 1;
        periodicEl.xpos = periodicEl.xpos + 1;

        domElement.style.gridArea = periodicEl.ypos.toString() + " / " +  periodicEl.xpos.toString() + " / span 1 / span 1";
    
        // Make divslocal
        document.querySelector('.container').append(domElement);

        // Add child-elements to each element
        const childDivsArray = ["number", "symbol", "name", "atomic_mass", "shells"];

        for (let i = 0; i < childDivsArray.length; i++) {
            const domElement = document.createElement('div');
            domElement.setAttribute("class", childDivsArray[i]);
            document.querySelector("#" + periodicEl.symbol.toLowerCase()).appendChild(domElement);
        }

        // DOMelements for child-elements
        let elNumber = domElement.querySelector(".number");
        let elSymbol = domElement.querySelector(".symbol"); 
        let elName = domElement.querySelector(".name"); 
        let elAtomicMass = domElement.querySelector(".atomic_mass"); 
        let elShells = domElement.querySelector(".shells"); 

        // Add number HTML
        elNumber.innerHTML = periodicEl.number;

        // Add symbol HTML
        elSymbol.innerHTML = periodicEl.symbol;

        // Add name HTML
        elName.innerHTML = periodicEl.name;

        // Add atomic_mass HTML
        elAtomicMass.innerHTML = periodicEl.atomic_mass.toFixed(2);


        // pushing Matter into Arrays for gas, solid, liquid, unkown
        if (periodicEl.phase === "Gas") {
            gasMatterArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.phase === "Solid" && periodicEl.number < 104) {
            solidMatterArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.phase === "Liquid") {
            liquidMatterArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.number > 103) {
            notNaturalMatterArray.push(periodicEl.symbol.toLowerCase());
        };

        // pushing Metals / Nonmetals into Arrays for the different types
        if (periodicEl.category === "alkali metal") {
            alkaliMetalArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "alkaline earth metal") {
            alkalineEarthMetalArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "lanthanide") {
            lanthanideArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "actinide") {
            actinideArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "transition metal") {
            transitionMetalArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "metalloid") {
            metalloidsArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "post-transition metal") {
            postTransitionMetalArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "diatomic nonmetal" || periodicEl.category === "polyatomic nonmetal") {
            reactiveNonmetalArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "noble gas") {
            nobleGasArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "unknown, probably transition metal" || periodicEl.category === "unknown, probably post-transition metal" || periodicEl.category === "unknown, probably metalloid" || periodicEl.category === "unknown, predicted to be noble gas") {
            unknownMatterArray.push(periodicEl.symbol.toLowerCase());
        };
    });
};

function elementBoxesColorConfiguration() {
    matterTypesArray.forEach((backgroundColorConfiguration) => {
        backgroundColorConfiguration.elementsIdArray.forEach((id) => {
            document.querySelector("#" + id).style.backgroundColor = backgroundColorConfiguration.colorBackground;
            console.log("The elementsBoxesColorCOnfiguration Thing works!!!");
        });
    });
};


function matterCategorizationConfigurator() {

    matterCategoriesArray.forEach(element => {
        element.elementsIdArray.forEach(configurator => {
            document.querySelector("#" + configurator + " .number").style.color = element.colorBackground;
        });
    });

};


function periodicTablePresenterGenerator() {
    
    // for presenter
    let elementBoxes = document.querySelectorAll(".el_box");
    let presenterBox = document.querySelector(".presenter");
    let presenterNumber = document.querySelector(".p_number");
    let presenterSymbol = document.querySelector(".p_symbol");
    let presenterName = document.querySelector(".p_name");
    let presenterAtomicMass = document.querySelector(".p_atomic_mass");
    let presenterShells = document.querySelector(".p_shells");

    elementBoxes.forEach(element => {
        element.addEventListener("mouseover", function(e) {

            togglePresenterVisibility(true);
            
            // Change background color
            presenterBox.style.backgroundColor = e.currentTarget.style.backgroundColor;
            presenterBox.style.color = e.currentTarget.style.color;
            presenterNumber.style.color = document.querySelector("#" + e.currentTarget.id + " .number").style.color;
            presenterNumber.style.color = e.currentTarget.querySelector(".number").style.color;
            presenterSymbol.style.color = e.currentTarget.style.color;
            presenterName.style.color = e.currentTarget.style.color;
            presenterAtomicMass.style.color = e.currentTarget.style.color;

            // Change Number
            const hoveredNumber = e.currentTarget.querySelector('.number').innerHTML;
            presenterNumber.innerHTML = periodicTable.elements[hoveredNumber - 1].number;
            document.querySelector(".presenter").append(presenterNumber);
    
            // Change Symbol
            const hoveredSymbol = e.currentTarget.querySelector('.symbol').innerHTML;
            presenterSymbol.innerHTML = periodicTable.elements[hoveredNumber - 1].symbol;
            document.querySelector(".presenter").append(presenterSymbol);
    
            // Change Name
            const hoveredName = e.currentTarget.querySelector('.name').innerHTML;
            presenterName.innerHTML = periodicTable.elements[hoveredNumber - 1].name;
            document.querySelector(".presenter").append(presenterName);
    
            // Change Atomic Mass
            const hoveredAtomicMass = e.currentTarget.querySelector('.atomic_mass').innerHTML;
            presenterAtomicMass.innerHTML = periodicTable.elements[hoveredNumber - 1].atomic_mass;
            document.querySelector(".presenter").append(presenterAtomicMass);
    
            // Change Shells
            presenterShells.innerHTML = periodicTable.elements[hoveredNumber - 1].shells;
    
                // Split Shells into sub divs (problem is that it is an entire String)
                let str = presenterShells.innerHTML;
                let subDivArray = str.split(",");
                // console.log(subDivArray);
                presenterShells.innerHTML = "";
    
                subDivArray.forEach(element => {
                    let domElementShells = document.createElement("div");
    
                    domElementShells.classList.add("shells_numbers");
                    domElementShells.innerHTML = element;
    
                    document.querySelector(".presenter .p_shells").append(domElementShells);
    
                });
            element.addEventListener("mouseleave", function() {
                togglePresenterVisibility(false);
            });
        });
    });    
};

function matterTypesBtnConfiguration() {
    matterTypesArray.forEach((configurator, e) => {

        initMatterTypesBtn();

        document.querySelector(configurator.elementsClassName).addEventListener("mouseover", function() {
            btnHoverOrClickLayout(configurator.elementBtn, configurator);
        });

        document.querySelector(configurator.elementsClassName).addEventListener("mouseleave", function() {
            initMatterTypesBtn();
        });
    });
};

function btnHoverOrClickLayout(elementDOM, element) {
    elementDOM.style.backgroundColor = element.colorHovered;
    elementDOM.style.color = element.colorFont;
    elementDOM.style.boxShadow = boxShadowBtn;
};

doSomething(matterTypesArray);
doSomething(matterCategoriesArray);

function doSomething(matterArray) {
    matterArray.forEach((configurator) => {

        document.querySelector(configurator.elementsClassName).addEventListener("click", function(e) {

            let something = configurator.elementsClassName;
            let currentBtn = e.currentTarget.classList;

            if (something) {
                btnHoverOrClickLayout(configurator.elementBtn, configurator);

                configurator.elementsIdArray.forEach(element => {
                    document.querySelector("#" + element).style.backgroundColor = configurator.colorBackground;
                    
                    if (matterArray === matterCategoriesArray) {
                        document.querySelector("#" + element).style.color = configurator.colorFont;
                        document.querySelector("#" + element + " .number").style.color = configurator.colorFont;
                    } else if (matterArray === matterTypesArray) {
                        matterCategorizationConfigurator();
                        document.querySelector("#" + element).style.color = configurator.colorFont;
                    }                  
                });
            } else if (something){
                console.log("Nothing was done");
            };
        });
    });
};

console.log(matterTypesArray);

function initMatterTypesBtn() {
    matterTypesArray.forEach((configurator) => {
        configurator.elementBtn.style.backgroundColor = configurator.colorBackground;
        configurator.elementBtn.style.boxShadow = "";
    });
};

function matterCategoriesBtnConfiguration() {
    matterCategoriesArray.forEach((configurator, e) => {

        initMatterCategorizationBtn();

        document.querySelector(configurator.elementsClassName).addEventListener("mouseover", function() {

            configurator.elementBtn.style.backgroundColor = configurator.colorHovered;
            configurator.elementBtn.style.color = configurator.colorFont;
            configurator.elementBtn.style.boxShadow = boxShadowBtn;

        });

        document.querySelector(configurator.elementsClassName).addEventListener("mouseleave", function() {

            initMatterCategorizationBtn();

        });

    });
};

function initMatterCategorizationBtn() {
    matterCategoriesArray.forEach((configurator) => {
        configurator.elementBtn.style.backgroundColor = configurator.colorBackground;
        configurator.elementBtn.style.color = configurator.colorFont;
        configurator.elementBtn.style.boxShadow = "";
    });
};

//[].forEach.call(document.querySelectorAll("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})
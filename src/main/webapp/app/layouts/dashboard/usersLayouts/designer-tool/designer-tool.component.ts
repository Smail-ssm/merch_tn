import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import html2canvas from 'html2canvas';

@Component({
  selector: 'jhi-designer-tool',
  templateUrl: './designer-tool.component.html',
  styleUrls: ['./bootstrap.min.css', './bootstrap-responsive.min.css', './jquery.miniColors.css', './designer-tool.component.scss'],
})
export class DesignerToolComponent {
  @ViewChild('tshirttype', { static: true }) tshirtType!: ElementRef;
  @ViewChild('tcanvas', { static: true }) canvasElement!: ElementRef;
  colorOptions: string[] = [
    '#ffffff',
    '#616161',
    '#f0f0f0',
    '#5b5b5b',
    '#222222',
    '#fc8d74',
    '#432d26',
    '#eead91',
    '#806355',
    '#382d21',
    '#faef93',
    '#aeba5e',
    '#8aa140',
    '#1f6522',
    '#13afa2',
    '#b8d5d7',
    '#15aeda',
    '#a5def8',
    '#0f77c0',
    '#3469b7',
    '#c50404',
  ];
  textToAdd: string = '';
  selectedObject: Object | any;
  selectedColor: string = '#ffffff';
  tshirtTypes = [
    {
      value: './content/images/crew_front.png',
      label: 'Crew Front',
    },
    {
      value: './content/images/mens_longsleeve_front.png',
      label: "Men's Long Sleeve Front",
    },
    {
      value: './content/images/mens_tank_front.png',
      label: "Men's Tank Front",
    },
    {
      value: './content/images/mens_hoodie_front.png',
      label: "Men's Hoodie Front",
    },
    { value: './content/images/womens_crew_front.png', label: 'womens crew front' },
  ];
  canvas!: fabric.Canvas;
  selectedCustomImage: string = './content/images/crew_front.png'; // Initialize with the default value if needed
  selectedCustomImageBack: string = './content/images/crew_back.png';
  canvasHovered: boolean | undefined;
  selectedCustomText: fabric.Text;

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement);
    this.createCanvas();
    this.initTshirtTypeChange();
    this.initializeChangeHandler();

    // Add event listeners for canvas interactions
    this.canvas.on('object:selected', event => {
      this.selectedObject = event.target;
    });

    this.canvas.on('selection:cleared', () => {
      this.selectedObject = null;
    });

    this.canvas.on('mouse:over', event => {
      if (event.target) {
        this.canvas.hoverCursor = 'pointer';
        this.canvas.setActiveObject(event.target);
      } else {
        this.canvas.hoverCursor = 'default';
        this.canvas.discardActiveObject();
      }
    });
  }

  constructor(private renderer: Renderer2) {
    this.selectedCustomText = new fabric.Text('Default Text', {
      left: 10,
      top: 10,
      fontSize: 20, // other properties...
    });
  }

  private createCanvas() {
    const canvasElement = this.renderer.createElement('canvas');
    this.renderer.setAttribute(canvasElement, 'id', 'tcanvas');
    this.renderer.appendChild(this.tshirtType.nativeElement.parentNode, canvasElement);
    this.canvas = new fabric.Canvas(canvasElement);
  }

  private initializeChangeHandler(): void {
    const tshirtType = document.getElementById('tshirttype') as HTMLSelectElement;

    if (tshirtType) {
      tshirtType.addEventListener('change', () => {
        this.selectedCustomImage = './content/images/' + tshirtType.value;
        this.selectedCustomImageBack = this.getBackImageName(this.selectedCustomImage);
      });
    }
  }

  @ViewChild('shirtDiv', { static: true }) shirtDivElement!: ElementRef;

  private getBackImageName(frontImage: string): string {
    // Assuming the back view image name is the front view image name with 'front' replaced by 'back'
    return frontImage.replace('front', 'back');
  }

  loadCustomImage(event: any) {
    const selectedOption = this.tshirtTypes.find(option => option.value === event.target.value);

    if (selectedOption) {
      this.selectedCustomImage = selectedOption.value;
      this.selectedCustomImageBack = this.getBackImageName(this.selectedCustomImage);
    }
  }

  addTextToCanvas() {
    if (this.textToAdd) {
      const text = new fabric.IText(this.textToAdd, {
        left: 50,
        top: 50,
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 'black',
      });

      this.canvas.add(text);
      this.canvas.renderAll();
      this.textToAdd = '';
    }
  }

  selectedFontFamily: string = 'Arial'; // Default font family, change as needed
  changeFontFamily(fontFamily: string): void {
    // Handle font family change logic
    this.selectedFontFamily = fontFamily;

    // Apply the font family to the selected text on the canvas
    const activeObject = this.canvas.getActiveObject();

    if (activeObject && activeObject.type === 'i-text') {
      (activeObject as any).set('fontFamily', fontFamily);
      this.canvas.renderAll();
    }
  }

  fontList: string[] = [
    'Arial',
    'Helvetica',
    'Myriad Pro',
    'Delicious',
    'Verdana',
    'Georgia',
    'Courier',
    'Comic Sans MS',
    'Impact',
    'Monaco',
    'Optima',
    'Hoefler Text',
    'Plaster',
    'Engagement',
  ];

  // Other methods and properties in your component...

  deleteSelectedObject() {
    if (this.selectedObject) {
      this.canvas.remove(this.selectedObject);
      this.canvas.renderAll();
    }
  }

  private initTshirtTypeChange() {
    const tshirtType = this.tshirtType.nativeElement;

    this.renderer.listen(tshirtType, 'change', event => {
      this.loadCustomImage(event);
    });
  }

  saveDivAsImage(): void {
    // Use html2canvas to capture the content of the shirtDiv
    html2canvas(this.shirtDivElement.nativeElement).then(canvas => {
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL('image/png');

      // Create a link element to trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = 'custom_tshirt_design.png';

      // Trigger a click event on the link to start the download
      const event = new MouseEvent('click');
      downloadLink.dispatchEvent(event);
    });
  }

  applyBackgroundColor() {
    const tshirtFacing = document.getElementById('tshirtFacingFront');
    const tshirtFacingBack = document.getElementById('tshirtFacingBack');

    if (tshirtFacing && tshirtFacingBack) {
      tshirtFacing.style.backgroundColor = this.selectedColor;
      tshirtFacingBack.style.backgroundColor = this.selectedColor;
    }
  }

  selectColor(color: string) {
    this.selectedColor = color;
    this.applyBackgroundColor();
  }

  changeTextValue(event: Event): void {
    const newTextValue = (event.target as HTMLInputElement).value;

    // Assuming this.selectedCustomText is the fabric.js text object
    this.selectedCustomText.set('text', newTextValue);

    // Render canvas after text change
    this.canvas.renderAll();
  }

  // Function to toggle bold style
  toggleBold(): void {
    // Toggle bold style for the selected text
    this.selectedCustomText.set('fontWeight', this.selectedCustomText.fontWeight === 'bold' ? 'normal' : 'bold');

    // Render canvas after style change
    this.canvas.renderAll();
  }

  // Function to toggle italic style
  toggleItalic(): void {
    // Toggle italic style for the selected text
    this.selectedCustomText.set('fontStyle', this.selectedCustomText.fontStyle === 'italic' ? '' : 'italic');

    // Render canvas after style change
    this.canvas.renderAll();
  }

  // Function to toggle strike-through
  toggleStrike(): void {
    // Toggle strike-through for the selected text
    const currentTextDecoration = (this.selectedCustomText as any).textDecoration as string;
    const newDecoration = currentTextDecoration === 'line-through' ? '' : 'line-through';

    (this.selectedCustomText as any).set('textDecoration', newDecoration);

    // Render canvas after style change
    this.canvas.renderAll();
  }

  // Function to toggle underline
  toggleUnderline(): void {
    // Toggle underline for the selected text
    const currentTextDecoration = (this.selectedCustomText as any).textDecoration as string;
    const newDecoration = currentTextDecoration === 'underline' ? '' : 'underline';

    (this.selectedCustomText as any).set('textDecoration', newDecoration);

    // Render canvas after style change
    this.canvas.renderAll();
  }

  // Function to handle font color change
  changeFontColor(event: Event): void {
    const newFontColor = (event.target as HTMLInputElement).value;

    // Assuming this.selectedCustomText is the fabric.js text object
    this.selectedCustomText.set('fill', newFontColor);

    // Render canvas after color change
    this.canvas.renderAll();
  }

  // Function to handle stroke color change
  changeStrokeColor(event: Event): void {
    const newStrokeColor = (event.target as HTMLInputElement).value;

    // Assuming this.selectedCustomText is the fabric.js text object
    this.selectedCustomText.set('stroke', newStrokeColor);

    // Render canvas after color change
    this.canvas.renderAll();
  }
}

import { Form, FormGroup, Input, Label } from "reactstrap";

function FormEvents() {
  return (
    <Form>
      <FormGroup>
        <Label for="unit">Select: Unit Reported</Label>
        <Input id="unit" name="unit" type="select">
          <option value="PRO 10">PRO 10</option>
          <option value="PRO 11">PRO 11</option>
          <option value="PRO 13">PRO 13</option>
        </Input>

        <Label for="source">Source of Report</Label>
        <Input id="source" name="source" type="text" />

        <Label for="dateReported">Date of Report</Label>
        <Input id="dateReported" name="dateReported" type="date" />

        <Label for="dateActivity">Date of Activity</Label>
        <Input id="dateActivity" name="dateActivity" type="date" />
      </FormGroup>
      <FormGroup>
        <Label for="eval">Evaluation</Label>
        <Input id="eval" name="eval" type="text" />

        <Label for="activityType">Select: Type of Activity</Label>
        <Input id="activityType" name="activityType" type="select">
          <option value="NON-VIOLENT">Non-Violent</option>
          <option value="VIOLENT">Violent</option>
          <option value="GTO">GTO</option>
        </Input>

        <Label for="activity">Activity</Label>
        <Input id="activity" name="activity" type="text" />

        <Label for="threatGroup">Threat Groups</Label>
        <Input id="threatGroup" name="threatGroup" type="text" />

        <Label for="strength">Strength</Label>
        <Input id="strength" name="strength" type="text" />
      </FormGroup>
      <FormGroup>
        <Label for="leader">Leader</Label>
        <Input id="leader" name="leader" type="text" />

        <Label for="position">Position</Label>
        <Input id="position" name="position" type="text" />

        <Label for="sitio">Sitio</Label>
        <Input id="sitio" name="sitio" type="text" />

        <Label for="brgy">Barangay</Label>
        <Input id="brgy" name="brgy" type="text" />

        <Label for="municipality">Municipality</Label>
        <Input id="municipality" name="municipality" type="text" />
      </FormGroup>
      <FormGroup>
        <Label for="province">Province</Label>
        <Input id="province" name="province" type="text" />

        <Label for="details">Details of Activity</Label>
        <Input id="details" name="details" type="textarea" />

        <Label for="MGRS">MGRS</Label>
        <Input id="MGRS" name="MGRS" type="text" />

        <Label for="lat">Latitude</Label>
        <Input id="lat" name="lat" type="text" required />

        <Label for="lng">Longitude</Label>
        <Input id="lng" name="lng" type="text" required />
      </FormGroup>
      <FormGroup>
        <Label for="bdpStatus">Select: BDP Status</Label>
        <Input id="bdpStatus" name="bdpStatus" type="select">
          <option value="NON-BDP">Non-BDP</option>
          <option value="BDP">BDP</option>
        </Input>

        <Label for="gfVertical">GF/Vertical Unit</Label>
        <Input id="gfVertical" name="gfVertical" type="text" />

        <Label for="category">Select: Threat Group Category</Label>
        <Input id="category" name="category" type="select">
          <option value="CTG">CTG</option>
          <option value="LTG">LTG</option>
          <option value="PAGS">PAGs</option>
          <option value="PPAGS">PPAGs</option>
          <option value="CG">CG</option>
        </Input>

        <Label for="rpsbDep">Select: Deployment Status</Label>
        <Input id="rpsbDep" name="rpsbDep" type="select">
          <option value="WITH DEPLOYMENT">With Deployment</option>
          <option value="WITHOUT DEPLOYMENT">Without Deployment</option>
        </Input>
      </FormGroup>
    </Form>
  );
}

export default FormEvents;

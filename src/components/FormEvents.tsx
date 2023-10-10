import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { parseISO, isValid, format } from "date-fns";

type FormEventsProps = {
  onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  formValue: {
    unit_reported: string;
    source_of_report: string;
    date_of_report: string;
    date_of_activity: string;
    evaluation: string;
    type_of_activity: string;
    activity: string;
    enemy_unit: string;
    strength: string;
    leader: string;
    position: string;
    sitio: string;
    brgy: string;
    municipality: string;
    province: string;
    details_of_activity: string;
    mgrs: string;
    latitude: string;
    longitude: string;
    bdp_status: string;
    gf_vertical_units: string;
    type: string;
    rpsb_deployment_status: string;
  };
  isEditing: boolean;
  toggle(): void;
};

function FormEvents({
  onChange,
  onSubmit,
  formValue,
  isEditing,
  toggle,
}: FormEventsProps) {
  const formatDateActivity = (dateStr: string) => {
    const parseDate = parseISO(dateStr);

    if (isValid(parseDate)) {
      return format(parseDate, "yyyy-MM-dd");
    } else {
      return "";
    }
  };

  const formatDateReport = (dateStr: string) => {
    const parseDate = parseISO(dateStr);

    if (isValid(parseDate)) {
      return format(parseDate, "yyyy-MM-dd");
    } else {
      return "";
    }
  };

  const dateOfReport = formatDateReport(formValue.date_of_report);
  const dateOfActivity = formatDateActivity(formValue.date_of_activity);

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="unit">Select: Unit Reported</Label>
        <Input
          id="unit"
          name="unit_reported"
          type="select"
          value={formValue.unit_reported}
          onChange={onChange}
        >
          <option>Select...</option>
          <option value="PRO 10">PRO 10</option>
          <option value="PRO 11">PRO 11</option>
          <option value="PRO 13">PRO 13</option>
        </Input>

        <Label for="source">Source of Report</Label>
        <Input
          id="source"
          name="source_of_report"
          type="text"
          value={formValue.source_of_report}
          onChange={onChange}
        />

        <Label for="dateReported">Date of Report</Label>
        <Input
          id="dateReported"
          name="date_of_report"
          type="date"
          value={dateOfReport}
          onChange={onChange}
        />

        <Label for="dateActivity">Date of Activity</Label>
        <Input
          id="dateActivity"
          name="date_of_activity"
          type="date"
          value={dateOfActivity}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="eval">Evaluation</Label>
        <Input
          id="eval"
          name="evaluation"
          type="text"
          value={formValue.evaluation}
          onChange={onChange}
        />

        <Label for="activityType">Select: Type of Activity</Label>
        <Input
          id="activityType"
          name="type_of_activity"
          type="select"
          value={formValue.type_of_activity}
          onChange={onChange}
        >
          <option>Select...</option>
          <option value="NON-VIOLENT">Non-Violent</option>
          <option value="VIOLENT">Violent</option>
          <option value="GTO">GTO</option>
        </Input>

        <Label for="activity">Activity</Label>
        <Input
          id="activity"
          name="activity"
          type="text"
          value={formValue.activity}
          onChange={onChange}
        />

        <Label for="threatGroup">Threat Groups</Label>
        <Input
          id="threatGroup"
          name="enemy_unit"
          type="text"
          value={formValue.enemy_unit}
          onChange={onChange}
        />

        <Label for="strength">Strength</Label>
        <Input
          id="strength"
          name="strength"
          type="text"
          value={formValue.strength}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="leader">Leader</Label>
        <Input
          id="leader"
          name="leader"
          type="text"
          value={formValue.leader}
          onChange={onChange}
        />

        <Label for="position">Position</Label>
        <Input
          id="position"
          name="position"
          type="text"
          value={formValue.position}
          onChange={onChange}
        />

        <Label for="sitio">Sitio</Label>
        <Input
          id="sitio"
          name="sitio"
          type="text"
          value={formValue.sitio}
          onChange={onChange}
        />

        <Label for="brgy">Barangay</Label>
        <Input
          id="brgy"
          name="brgy"
          type="text"
          value={formValue.brgy}
          onChange={onChange}
        />

        <Label for="municipality">Municipality</Label>
        <Input
          id="municipality"
          name="municipality"
          type="text"
          value={formValue.municipality}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="province">Province</Label>
        <Input
          id="province"
          name="province"
          type="text"
          value={formValue.province}
          onChange={onChange}
        />

        <Label for="details">Details of Activity</Label>
        <Input
          id="details"
          name="details_of_activity"
          type="textarea"
          value={formValue.details_of_activity}
          onChange={onChange}
        />

        <Label for="MGRS">MGRS</Label>
        <Input
          id="MGRS"
          name="mgrs"
          type="text"
          value={formValue.mgrs}
          onChange={onChange}
        />

        <Label for="lat">Latitude</Label>
        <Input
          id="lat"
          name="latitude"
          type="text"
          required
          value={formValue.latitude}
          onChange={onChange}
        />

        <Label for="lng">Longitude</Label>
        <Input
          id="lng"
          name="longitude"
          type="text"
          required
          value={formValue.longitude}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="bdpStatus">Select: BDP Status</Label>
        <Input
          id="bdpStatus"
          name="bdp_status"
          type="select"
          value={formValue.bdp_status}
          onChange={onChange}
        >
          <option>Select...</option>
          <option value="NON-BDP">Non-BDP</option>
          <option value="BDP">BDP</option>
        </Input>
        <Label for="gfVertical">GF/Vertical Unit</Label>
        <Input
          id="gfVertical"
          name="gf_vertical_units"
          type="text"
          value={formValue.gf_vertical_units}
          onChange={onChange}
        />
        <Label for="category">Select: Threat Group Category</Label>
        <Input
          id="category"
          type="select"
          name="type"
          value={formValue.type}
          onChange={onChange}
        >
          <option>Select...</option>
          <option value="CTG">CTG</option>
          <option value="LTG">LTG</option>
          <option value="PAGS">PAGs</option>
          <option value="PPAGS">PPAGs</option>
          <option value="CG">CG</option>
        </Input>
        <Label for="rpsbDep">Select: Deployment Status</Label>
        <Input
          id="rpsbDep"
          name="rpsb_deployment_status"
          type="select"
          value={formValue.rpsb_deployment_status}
          onChange={onChange}
        >
          <option>Select...</option>
          <option value="WITH DEPLOYMENT">With Deployment</option>
          <option value="WITHOUT DEPLOYMENT">Without Deployment</option>
        </Input>
      </FormGroup>
      <Button color="primary" type="submit">
        {!isEditing ? "Submit" : "Save"}
      </Button>
      <Button className="ms-2" color="secondary" onClick={toggle}>
        Cancel
      </Button>
    </Form>
  );
}

export default FormEvents;
